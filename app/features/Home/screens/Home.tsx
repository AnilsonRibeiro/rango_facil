import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { Button, Screen, Title } from "../../../components"

import { AuthenticatedStackParamList } from "../navigation/AuthenticatedNavigator"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../../models"
import { spacing } from "../../../theme"
import { Header } from "../components/Header"
import { Card } from "../components/Card"

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
    const { authenticationStore } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation<StackNavigationProp<AuthenticatedStackParamList>>()

    const handleLogout = () => {
      authenticationStore.logout()
    }

    return (
      <Screen
        style={$root}
        contentContainerStyle={[$container]}
        preset="fixed"
        safeAreaEdges={["top", "bottom"]}
      >
        <View style={$content}>
          <Header />
          <Title text="Categorias" />

          <Card text="Café da manhã" icon="Clock" />
        </View>

        <Button text="Logout" preset="outline" onPress={handleLogout} />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
  flex: 1,
  width: "100%",
  justifyContent: "flex-start",
  alignItems: "center",
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: spacing.large,
}
