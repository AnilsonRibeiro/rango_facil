import React, { FC, useReducer, useState } from "react"
import { observer } from "mobx-react-lite"
import { LayoutChangeEvent, ScrollView, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Button, Screen, Avatar, TextFieldForEdit, Text, Tag } from "../../../components"
import { colors, spacing } from "../../../theme"
import { DateField } from "../../../components/DateField"
import { OnboardingStackParamList } from "../navigation/OnboardingNavigator"
import { useStores } from "../../../models"
import { Tags } from "../components/Tags"
import { tags as data } from "../constants/tags"

import { Progress, StepType } from "../components/Progress"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Welcome: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Welcome" component={WelcomeScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore

enum ActionsEnum {
  COMPLETED_STEP = "completedStep",
}

type ActionsType = {
  type: ActionsEnum
  payload: number
}

export const PersonalData: FC<StackScreenProps<OnboardingStackParamList, "PersonalData">> =
  observer(function PersonalData() {
    const [width, setWidth] = useState<number>(0)

    const completedStepReduce = (
      state: { steps: StepType[]; currentStep: number },
      action: ActionsType,
    ) => {
      const { type, payload } = action

      switch (type) {
        case ActionsEnum.COMPLETED_STEP:
          return {
            steps: state.steps.map((step, index) => {
              if (index === payload) {
                return { ...step, completed: true }
              }
              return step
            }),
            currentStep: payload + 1,
          }
      }
    }

    const [state, dispatch] = useReducer(completedStepReduce, {
      steps: [
        { id: "1", completed: false },
        { id: "2", completed: false },
        { id: "3", completed: false },
      ],
      currentStep: 0,
    })

    const $viewStyle = (width: number) =>
      ({
        height: 0,
        width,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: width,
        borderStyle: "solid",

        backgroundColor: colors.transparent,
        borderTopColor: colors.transparent,
        borderBottomColor: colors.transparent,
        borderLeftColor: colors.palette.primary300,

        borderRadius: 9999,
      } as ViewStyle)

    // Pull in one of our MST stores
    const { authenticationStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const avatar = authenticationStore.user.photo
    const name = authenticationStore.user.fullName
    const dateOfBirth = authenticationStore.user.dateOfBirth
    const onChangeDate = authenticationStore.user.setDateOfBirth

    const handleCompletedStep = (index: number) => {
      dispatch({ type: ActionsEnum.COMPLETED_STEP, payload: index })
    }

    const getWidth = (e: LayoutChangeEvent) => {
      setWidth(e.nativeEvent.layout.width)
    }

    return (
      <Screen
        style={$root}
        preset="fixed"
        safeAreaEdges={["top", "bottom"]}
        contentContainerStyle={$rootContent}
      >
        <Progress steps={state.steps} />

        <View style={$content}>
          <View style={$wrapperAvatar}>
            <Avatar source={{ uri: avatar }} />
            <View style={$wrapperFields}>
              <TextFieldForEdit value={name} placeholder="Nome sobrenome" />
              <DateField value={dateOfBirth} onChange={onChangeDate} />
            </View>
          </View>
          {state.currentStep === 1 && <Tags data={data} />}

          <View style={$wrapperTags} onLayout={getWidth}>
            <Text text="Perfil alimentar:" preset="subheading" />
            <View style={$viewStyle(width)} />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={$wrapperCategories}
          >
            <Tag variant="rectangular" name="Vegano" />
            <Tag variant="rectangular" name="Carnívoro" />
            <Tag variant="rectangular" name="Sem açúcar" />
            <Tag variant="rectangular" name="Cetogênica" />
          </ScrollView>
        </View>

        <View style={$wrapperButton}>
          <Button text="Continuar" onPress={() => handleCompletedStep(0)} />
        </View>
      </Screen>
    )
  })

const $root: ViewStyle = {
  flex: 1,
}

const $rootContent: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
}

const $content: ViewStyle = {
  flex: 1,

  justifyContent: "flex-start",
  paddingTop: "35%",
}

const $wrapperAvatar: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.large,
}

const $wrapperFields: ViewStyle = {
  flex: 1,
  marginLeft: spacing.medium,
}

const $wrapperButton: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $wrapperTags: ViewStyle = {
  marginHorizontal: spacing.large,
}

const $wrapperCategories: ViewStyle = {
  marginTop: spacing.large,
  flexWrap: "wrap",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
}
