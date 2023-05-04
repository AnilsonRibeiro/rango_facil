import { useStores } from "../../../models"
import { Avatar, Icon, Text } from "../../../components"
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "../../../theme"

interface HeaderProps {
  image?: string
  name?: string
}

export function Header(props: HeaderProps) {
  const { image, name } = props

  const { authenticationStore } = useStores()

  const title = name ?? authenticationStore.user.shortName

  const url = image ?? authenticationStore.user.photo

  return (
    <View style={$root}>
      <View style={$container}>
        <View style={$content}>
          <Avatar preset="small" source={{ uri: url }} />

          <Text text={title} style={$textStyles} />
        </View>

        <Icon icon="Gear" size={32} onPress={() => {}} />
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
