import React from "react"
import { Icon, IconTypes, Text } from "../../../../../components"
import { TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "../../../../../theme"

interface CardProps {
  text: string
  icon: IconTypes
}

export function Card(props: CardProps) {
  const { text, icon } = props
  return (
    <View>
      <View style={$container}>
        <Icon icon={icon} size={32} />
      </View>
      <Text text={text} style={$text} />
    </View>
  )
}

const $container: ViewStyle = {
  width: 60,
  height: 60,
  borderRadius: 16,
  backgroundColor: colors.palette["neutral300_10%"],
  alignItems: "center",
  justifyContent: "center",
  marginRight: spacing.medium,
}

const $text: TextStyle = {
  width: 60,
  textAlign: "center",
  marginTop: spacing.extraSmall,
}
