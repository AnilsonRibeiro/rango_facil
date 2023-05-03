import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, TextStyle, ViewStyle } from "react-native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { Button, Screen, Text } from "../../../components"
import { colors, spacing, timing } from "../../../theme"
import { ProgressSteps } from "../../../components/ProgressSteps"

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated"
import {
  AuthenticatedStack,
  AuthenticatedStackParamList,
} from "../navigation/AuthenticatedNavigator"
import { useNavigation } from "@react-navigation/native"

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

export const HomeScreen: FC<StackScreenProps<AuthenticatedStackParamList, "Home">> = observer(
  function HomeScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation<StackNavigationProp<AuthenticatedStackParamList>>()

    return (
      <Screen
        style={$root}
        contentContainerStyle={[$container]}
        preset="auto"
        safeAreaEdges={["top", "bottom"]}
      >
        <Text text="HOME" preset="heading" />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
