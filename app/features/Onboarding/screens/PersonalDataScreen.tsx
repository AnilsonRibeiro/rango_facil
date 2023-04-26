import React, { FC, useEffect, useReducer, useState } from "react"
import { observer } from "mobx-react-lite"
import { LayoutChangeEvent, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Button, Screen, Avatar, TextFieldForEdit, Text } from "../../../components"
import { colors, spacing } from "../../../theme"
import { DateField } from "../../../components/DateField"
import { OnboardingStackParamList } from "../navigation/OnboardingNavigator"
import { useStores } from "../../../models"
import { Tags } from "../components/Tags"
import { tags as data, categories } from "../constants/tags"

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
    const [widthPerfilAlimentar, setWidthPerfilAlimentar] = useState<number>(0)

    const completedStepReduce = (
      state: { steps: StepType[]; currentStep: number },
      action: ActionsType,
    ) => {
      const { type, payload } = action

      switch (type) {
        case ActionsEnum.COMPLETED_STEP:
          return {
            steps: state.steps.map((step, index) => {
              if (index === payload - 1) {
                return { ...step, completed: true }
              }
              return step
            }),
            currentStep: payload,
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

    const handleCompletedStep = () => {
      dispatch({ type: ActionsEnum.COMPLETED_STEP, payload: state.currentStep + 1 })
    }

    const getWidth = (e: LayoutChangeEvent, locale: "default" | "perfilAlimentar") => {
      if (locale === "default") {
        setWidth(e.nativeEvent.layout.width)
      } else {
        setWidthPerfilAlimentar(e.nativeEvent.layout.width)
      }
    }

    useEffect(() => {
      console.log(state.steps)
    }, [state])

    const showTags = state.steps[0].completed
    const showCategories = state.steps[1].completed

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
          {showTags && (
            <Tags
              data={data}
              headerComponent={
                <View style={$headerTags} onLayout={(e) => getWidth(e, "default")}>
                  <Text text="Alergias:" preset="subheading" />
                  <View style={$viewStyle(width)} />
                </View>
              }
              scrollStyle={$overrideScrollViewStyleTags}
            />
          )}

          {showCategories && (
            <Tags
              data={categories}
              variant="rectangular"
              scrollStyle={$overrideScrollViewStyleCategories}
              headerComponent={
                <View style={$headerTags} onLayout={(e) => getWidth(e, "perfilAlimentar")}>
                  <Text text="Perfil alimentar:" preset="subheading" />
                  <View style={$viewStyle(widthPerfilAlimentar)} />
                </View>
              }
            />
          )}
        </View>
        <View style={$wrapperButton}>
          <Button text="Continuar" onPress={handleCompletedStep} />
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
  paddingHorizontal: spacing.large,
}

const $wrapperAvatar: ViewStyle = {
  flexDirection: "row",
}

const $wrapperFields: ViewStyle = {
  flex: 1,
  marginLeft: spacing.medium,
}

const $wrapperButton: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $headerTags: ViewStyle = {
  alignSelf: "flex-start",
}

const $overrideScrollViewStyleCategories: ViewStyle = {
  height: 70,
  marginTop: spacing.huge,
}

const $overrideScrollViewStyleTags: ViewStyle = {
  minHeight: 170,
  height: 170,

  marginTop: spacing.large,
}
