import { Avatar, Icon, Text } from "../../../../../components"
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "../../../../../theme"

interface HeaderProps {
  image: string
  name: string
}

export function Header(props: HeaderProps) {
  const { image, name } = props

  return (
    <View style={$root}>
      <View style={$container}>
        <View style={$content}>
          <Avatar preset="small" source={{ uri: image }} />

          <Text text={name} style={$textStyles} />
        </View>

        <Icon icon="settings" onPress={() => console.log("settings")} />
      </View>
    </View>
  )
}

const $root: ViewStyle = {
  width: "100%",
  paddingTop: spacing.large,
  height: 56,
}

const $content: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $textStyles: TextStyle = {
  fontSize: 18,
  lineHeight: 28,
  color: colors.palette.neutral100,
  marginLeft: spacing.small,
}
