import React from "react"
import { Icon, IconTypes, Text } from "../../../components"
import { TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "../../../theme"

interface CardProps {
  text: string
  icon: IconTypes
}

export function Card(props: CardProps) {
  const { text, icon } = props
  return (
    <View style={$root}>
      <View style={$container}>
        <Icon icon={icon} size={32} />
      </View>
      <Text text={text} style={$text} />
    </View>
  )
}

const $root: ViewStyle = {
  height: 60,
}

const $container: ViewStyle = {
  width: 60,
  height: 60,
  borderRadius: 16,
  backgroundColor: colors.palette["neutral300_10%"],
  alignItems: "center",
  justifyContent: "center",
}

const $text: TextStyle = {
  width: 60,
  textAlign: "center",
  marginTop: spacing.extraSmall,
}
