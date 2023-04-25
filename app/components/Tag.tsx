import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { colors } from "../theme"
import { Icon, IconTypes } from "./Icon"

type Preset = "default" | "medium" | "big"

interface TagProps {
  preset?: Preset
  icon: IconTypes
}

export const Tag: FC<TagProps> = ({ preset = "default", icon }) => {
  const $viewStyle = [$root, $preset[preset]]

  const iconSize = preset === "big" ? 80 : preset === "medium" ? 64 : 40
  return (
    <View style={$viewStyle}>
      <Icon icon={icon} size={iconSize} color={colors.palette.primary600} />
    </View>
  )
}

const $root: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.palette.neutral100,
  borderRadius: 9999,
}

const $small: ViewStyle = {
  width: 56,
  height: 56,
}

const $medium: ViewStyle = {
  width: 80,
  height: 80,
}

const $big: ViewStyle = {
  width: 96,
  height: 96,

  marginVertical: 35,
}

const $preset = {
  default: $small as ViewStyle,
  medium: $medium as ViewStyle,
  big: $big as ViewStyle,
}
