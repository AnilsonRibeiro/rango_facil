import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Screen, Text, GoogleButton, AppleButton } from "../../../components"
import { colors, spacing } from "../../../theme"
import { OnboardingStackParamList } from "../navigation/OnboardingNavigator"

const signUpBackground = require("../../../../assets/images/onboarding/signup-background.png")

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
export const SignUpScreen: FC<StackScreenProps<OnboardingStackParamList, "SignUp">> = observer(
  function SignUpScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <ImageBackground source={signUpBackground} resizeMode="cover" style={$image}>
        <Screen
          style={$root}
          contentContainerStyle={$container}
          preset="auto"
          backgroundColor={colors.transparent}
          safeAreaEdges={["end"]}
        >
          <Text preset="heading" text="Rango Fácil" style={[$title, $text]} />

          <GoogleButton />
          <View style={$space} />
          <AppleButton />
        </Screen>
      </ImageBackground>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  padding: spacing.huge,
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
}

const $image: ViewStyle = {
  flex: 1,
  minHeight: "100%",
  minWidth: "100%",
}

const $title: TextStyle = {
  marginBottom: 40,
}

const $text: TextStyle = {
  textAlign: "center",
}
const $space: ViewStyle = {
  height: 24,
}
