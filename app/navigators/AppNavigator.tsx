/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { StackScreenProps, createStackNavigator } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import Config from "../config"

import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

import { OnboardingStack } from "../features/Onboarding/navigation/OnboardingNavigator"
import { AuthenticationProvider } from "../context/Authentication"
import { HomeScreen } from "../features/Home/screens/Home"
import { useAuthentication } from "../hooks/useAuthentication"

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

export type AppStackParamList = {
  Home: undefined
  Onboarding: undefined
  // 🔥 Your screens go here
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>
// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const { user } = useAuthentication()
  // useEffect(() => {
  //   messaging.setupNotificationToken()
  //   messaging.setupNotificationListener()

  //   return () => {
  //     messaging.messaging.onTokenRefresh(null)
  //     messaging.messaging.setBackgroundMessageHandler(null)
  //   }
  // }, [])

  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging.messaging.onNotificationOpenedApp((remoteMessage) => {
  //     console.log(
  //       "Notification caused app to open from background state:",
  //       remoteMessage.notification,
  //     )
  //   })

  //   // Check whether an initial notification is available
  //   messaging.messaging.getInitialNotification().then((remoteMessage) => {
  //     if (remoteMessage) {
  //       console.log("Notification caused app to open from quit state:", remoteMessage.notification)
  //       console.log("remoteMessage.data", remoteMessage.data)
  //       // setInitialRoute(remoteMessage.data.type) // e.g. "Settings"
  //       linkTo(remoteMessage.data.url)
  //     }
  //   })
  // }, [])

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={user ? "Home" : "Onboarding"}
    >
      {user ? (
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Onboarding" component={OnboardingStack} />
        </Stack.Group>
      )}

      {/** 🔥 Your screens go here */}
    </Stack.Navigator>
  )
})

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {
  hideSplashScreen: () => Promise<void>
}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <AuthenticationProvider hideSplashScreen={props.hideSplashScreen}>
      <NavigationContainer
        ref={navigationRef}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        {...props}
      >
        <AppStack />
      </NavigationContainer>
    </AuthenticationProvider>
  )
})
