import React from "react"
import { Button, ButtonProps } from "../Button"
import { ViewStyle, ImageStyle, TextStyle } from "react-native"
import { colors, spacing } from "../../theme"
import { Icon } from "../Icon"

interface AppleButtonProps extends ButtonProps {}

export function AppleButton(props: AppleButtonProps) {
  return (
    <Button
      text="Logar com Apple"
      {...props}
      style={$root}
      pressedStyle={$pressed}
      textStyle={$text}
      LeftAccessory={() => <Icon icon={"apple"} style={$icon} />}
    />
  )
}

const $root: ViewStyle = {
  backgroundColor: colors.palette.neutral850,
}
const $text: TextStyle = {
  color: colors.palette.neutral150,
}

const $pressed: ViewStyle = {
  backgroundColor: colors.palette.neutral850,
  opacity: 0.8,
}

const $icon: ImageStyle = {
  width: 24,
  height: 24,
  marginRight: spacing.medium,
}
