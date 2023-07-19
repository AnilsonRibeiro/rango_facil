/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */

import { createStackNavigator } from "@react-navigation/stack"

import { observer } from "mobx-react-lite"
import React from "react"

import { WelcomeScreen } from "../screens/WelcomeScreen"
import { PersonalData } from "../screens/PersonalDataScreen"
import { SignUpScreen } from "../screens/SignUpScreen"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type OnboardingStackParamList = {
  Welcome: undefined
  SignUp: undefined
  PersonalData: {
    id: string
    name: string
    email: string
    idToken: string
    avatar?: string
  }
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const { Navigator, Screen } = createStackNavigator<OnboardingStackParamList>()

export const OnboardingStack = observer(function OnboardingStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Welcome" component={WelcomeScreen} />
      <Screen name="SignUp" component={SignUpScreen} />
      <Screen name="PersonalData" component={PersonalData} />
    </Navigator>
  )
})
