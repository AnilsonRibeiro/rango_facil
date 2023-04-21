import React from "react"
import { Button, ButtonProps } from "../Button"
import { ViewStyle, ImageStyle } from "react-native"
import { colors, spacing } from "../../theme"
import { Icon } from "../Icon"

interface GoogleButtonProps extends ButtonProps {}

export function GoogleButton(props: GoogleButtonProps) {
  return (
    <Button
      text="Logar com Google"
      {...props}
      style={$root}
      pressedStyle={$pressed}
      LeftAccessory={() => <Icon icon="google" style={$icon} />}
    />
  )
}

const $root: ViewStyle = {
  backgroundColor: colors.palette.white,
}

const $pressed: ViewStyle = {
  backgroundColor: colors.palette.white,
  opacity: 0.8,
}

const $icon: ImageStyle = {
  width: 24,
  height: 24,
  marginRight: spacing.medium,
}
