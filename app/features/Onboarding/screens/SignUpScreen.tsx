import React, { FC } from "react"

import { ImageBackground, TextStyle, View, ViewStyle } from "react-native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { Screen, Text, GoogleButton, AppleButton } from "../../../components"
import { colors, spacing } from "../../../theme"
import { OnboardingStackParamList } from "../navigation/OnboardingNavigator"

import { useNavigation } from "@react-navigation/native"

import { useAuthentication } from "../../../hooks/useAuthentication"

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
export const SignUpScreen: FC<StackScreenProps<OnboardingStackParamList, "SignUp">> = () => {
  const { googleOAuth } = useAuthentication()

  // Pull in navigation via hook
  const navigation = useNavigation<StackNavigationProp<OnboardingStackParamList>>()

  const handleSignUp = async () => {
    try {
      const response = await googleOAuth()

      navigation.push("PersonalData", {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        avatar: response.user.photo,
        idToken: response.idToken,
      })
    } catch (error) {
      console.log(error)
    }
  }

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

        <GoogleButton onPress={handleSignUp} />
        <View style={$space} />
        <AppleButton onPress={() => console.log("Apple Button")} />
      </Screen>
    </ImageBackground>
  )
}

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
