import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Button, Screen, Avatar, TextFieldForEdit } from "../../../components"
import { colors, spacing } from "../../../theme"
import { DateField } from "../../../components/DateField"
import { OnboardingStackParamList } from "../navigation/OnboardingNavigator"

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
export const PersonalData: FC<StackScreenProps<OnboardingStackParamList, "PersonalData">> =
  observer(function PersonalData() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen
        style={$root}
        preset="fixed"
        safeAreaEdges={["top", "bottom"]}
        contentContainerStyle={$rootContent}
      >
        <View style={$progressContainer}>
          <View style={$progressCell} />
          <View style={$progressCell} />
          <View style={$progressCell} />
        </View>

        <View style={$content}>
          <View style={$wrapperAvatar}>
            <Avatar />
            <View style={$wrapperFields}>
              <TextFieldForEdit placeholder="Nome sobrenome" />
              <DateField />
            </View>
          </View>
        </View>
        <View style={$wrapperButton}>
          <Button text="Continuar" />
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

const $progressContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  marginTop: spacing.large,
}

const $progressCell: ViewStyle = {
  flex: 1,
  height: 8,
  maxWidth: "30%",
  backgroundColor: colors.palette.neutral300,
  borderRadius: 9999,
}

const $content: ViewStyle = {
  flex: 1,
  padding: spacing.large,
  justifyContent: "flex-start",
  paddingTop: "35%",
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
