import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen } from "../screens/Home/screens"

import { IconTypes, TabBar } from "../../../components"

type AuthenticatedBottomTabNavigatorParamsList = {
  Home: undefined
  Search: undefined
  Adicionar: undefined
  Favoritos: undefined
  Profile: undefined
}

const { Screen, Navigator } = createBottomTabNavigator<AuthenticatedBottomTabNavigatorParamsList>()

const icons: Record<string, IconTypes> = {
  Home: "House",
  Search: "MagnifyingGlass",
  Adicionar: "PlusCircle",
  Favoritos: "Heart",
  Profile: "UserCircle",
}

export const AuthenticatedBottomTabNavigator = () => {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
      tabBar={(props) => <TabBar initialActiveRoute="Home" icons={icons} {...props} />}
    >
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Search" component={HomeScreen} />
      <Screen name="Adicionar" component={HomeScreen} />
      <Screen name="Favoritos" component={HomeScreen} />
      <Screen name="Profile" component={HomeScreen} />
    </Navigator>
  )
}
