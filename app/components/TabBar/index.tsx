import React, { useEffect, useState } from "react"
import { Dimensions, StyleProp, View, ViewStyle } from "react-native"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"

import { Icon, IconTypes } from "../Icon"
import { colors, timing } from "../../theme"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

const { width } = Dimensions.get("window")

interface TabBarProps extends BottomTabBarProps {
  initialActiveRoute: string
  icons: Record<string, IconTypes>
}

export const TabBar = (props: TabBarProps) => {
  const { initialActiveRoute, icons, ...rest } = props
  const { paddingBottom } = useSafeAreaInsetsStyle(["bottom"])

  const [activeRoute, setActiveRoute] = useState<string>(() => initialActiveRoute)

  const routes = rest.state.routes
    .map((route) => route.name)
    .map((route) => ({
      name: route,
      active: route === activeRoute,
      icon: icons[route] as IconTypes,
    }))

  const $rootStyle = (value: number | string) => {
    return {
      ...$root,
      height: Number(value) + Number($root.height),
      paddingBottom: Number(value),
    } as StyleProp<ViewStyle>
  }

  const left = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      left: left.value,
    }
  })

  const handleOnPress = (route: string) => {
    setActiveRoute(route)
    props.navigation.navigate(route)
  }

  useEffect(() => {
    const position = props.state.index * (width * 0.2)
    left.value = withTiming(position, { duration: timing.quick, easing: Easing.bounce })
  }, [props.state.index])

  return (
    <View style={$rootStyle(paddingBottom)}>
      <Animated.View style={[$pointer, animatedStyles]} />
      {routes.map(({ icon, active, name }) => (
        <Icon
          key={name}
          icon={icon}
          color={active ? colors.palette.neutral200 : colors.palette.neutral300}
          size={32}
          onPress={() => handleOnPress(name)}
        />
      ))}
    </View>
  )
}

const $root: ViewStyle = {
  position: "relative",
  width: "100%",
  height: 50,
  backgroundColor: colors.palette.primary700,
  borderColor: colors.palette["neutral100_12%"],
  borderTopWidth: 2,

  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
}

export const $pointer: ViewStyle = {
  position: "absolute",
  backgroundColor: colors.palette.neutral200,
  height: 2,
  top: -2,
  width: "20%",
}
