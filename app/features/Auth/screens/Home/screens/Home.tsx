import React, { FC } from "react"

import { ScrollView, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Button, Icon, Screen, Title, Card as APPCard } from "../../../../../components"

import { AuthenticatedStackParamList } from "../navigation/AuthenticatedNavigator"

import { spacing } from "../../../../../theme"
import { Header } from "../components/Header"
import { Card } from "../components/Card"
import { useAuthentication } from "../../../../../hooks/useAuthentication"

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

export const HomeScreen: FC<StackScreenProps<AuthenticatedStackParamList, "Home">> = () => {
  const { user, logout } = useAuthentication()
  return (
    <Screen
      style={$root}
      contentContainerStyle={[$container]}
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={$content}>
        <Header name={user?.name} image={user?.avatar} />

        <View style={$categoriesWrapper}>
          <Title text="Categorias" />

          <ScrollView horizontal style={$categories}>
            <Card text="Café da manhã" icon="Clock" />
            <Card text="Café da manhã" icon="Clock" />
            <Card text="Café da manhã" icon="Clock" />
            <Card text="Café da manhã" icon="Clock" />
            <Card text="Café da manhã" icon="Clock" />
            <Card text="Café da manhã" icon="Clock" />
          </ScrollView>
        </View>
      </View>

      <APPCard />
      <Button
        preset="outline"
        text="Sair"
        RightAccessory={() => <Icon icon="SignOut" style={$buttonIcon} />}
        onPress={logout}
      />
    </Screen>
  )
}

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
  paddingBottom: 66,
}

const $categoriesWrapper: ViewStyle = {
  width: "100%",
  marginTop: spacing.large,
}

const $categories: ViewStyle = {
  marginTop: spacing.medium,
}

const $buttonIcon: ViewStyle = {
  marginLeft: spacing.extraSmall,
}
