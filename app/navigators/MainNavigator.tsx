/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */

import { StackScreenProps, createStackNavigator } from "@react-navigation/stack"

import { observer } from "mobx-react-lite"
import React from "react"

import {
  AuthenticatedStack,
  AuthenticatedStackParamList,
} from "../features/Home/navigation/AuthenticatedNavigator"
import {
  OnboardingStack,
  OnboardingStackParamList,
} from "../features/Onboarding/navigation/OnboardingNavigator"
import { useStores } from "../models"

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
export type MainStackParamList = {
  Authenticated: StackScreenProps<AuthenticatedStackParamList>
  Onboarding: StackScreenProps<OnboardingStackParamList>
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const { Navigator, Screen, Group } = createStackNavigator<MainStackParamList>()

export const MainStack = observer(function MainStack() {
  const { authenticationStore } = useStores()

  const isAuthenticated = authenticationStore.isAuthenticated

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? "Authenticated" : "Onboarding"}
    >
      {isAuthenticated ? (
        <Group>
          <Screen name="Authenticated" component={AuthenticatedStack} />
        </Group>
      ) : (
        <Group>
          <Screen name="Onboarding" component={OnboardingStack} />
        </Group>
      )}
    </Navigator>
  )
})
