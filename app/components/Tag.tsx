import React, { FC, useState } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { colors } from "../theme"
import { Icon, IconTypes } from "./Icon"
import { Text } from "./Text"

type Preset = "default" | "medium" | "big"

interface TagProps {
  name: string
  icon: IconTypes
  selected?: boolean
  preset?: Preset
}

export const Tag: FC<TagProps> = (props) => {
  const [isSelected, setIsSelected] = useState<boolean>(() => selected ?? false)

  const { icon, name, preset = "default", selected = false, ...rest } = props

  const iconSize = preset === "big" ? 80 : preset === "medium" ? 64 : 40

  function $viewStyle(selected: boolean) {
    return [$root, $preset[preset], selected && $rootSelected]
  }

  const handlePress = () => {
    setIsSelected((s) => !s)
  }

  return (
    <TouchableOpacity style={$viewStyle(isSelected)} onPress={handlePress} {...rest}>
      <Icon
        icon={icon}
        size={iconSize}
        color={!isSelected ? colors.palette.primary600 : colors.palette["neutral100_12%"]}
      />
      {isSelected && <Text text={name} style={$title} preset="default" />}
    </TouchableOpacity>
  )
}

const $root: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.palette.neutral100,
  borderRadius: 9999,

  position: "relative",
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

const $title: TextStyle = {
  color: colors.palette.neutral100,
  position: "absolute",
}

const $rootSelected: ViewStyle = {
  backgroundColor: colors.palette.primary600,
}

const $preset = {
  default: $small as ViewStyle,
  medium: $medium as ViewStyle,
  big: $big as ViewStyle,
}
