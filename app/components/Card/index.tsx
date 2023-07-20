import { colors, spacing } from "../../theme"
import React from "react"
import { ImageBackground, TextStyle, View, ViewStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Text } from "../Text"
import { Icon } from "../Icon"

export const Card = () => {
  return (
    <ImageBackground
      source={{ uri: "https://github.com/renanloureiroo.png" }}
      style={$imageBackground}
      resizeMode="cover"
    >
      <LinearGradient colors={[colors.transparent, colors.palette.primary700]}>
        <View style={$root}>
          <View>
            <Text text="Bolo de Banana" weight="medium" style={$title} />

            <View style={$row}>
              <Icon icon="Clock" containerStyle={$icon} />
              <Text text="90 min" />
            </View>

            <View style={$row}>
              <Icon icon="Users" containerStyle={$icon} />
              <Text text="10 pessoas" />
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  )
}

const $root: ViewStyle = {
  borderRadius: spacing.extraSmall,
  overflow: "hidden",
  height: 185,
  width: 144,
  padding: spacing.extraSmall,
  justifyContent: "flex-end",
}

const $imageBackground: ViewStyle = {
  borderRadius: spacing.extraSmall,
  overflow: "hidden",
}

const $title: TextStyle = {
  fontSize: 16,
  lineHeight: 16 * 1.4,
}

const $icon: ViewStyle = {
  marginRight: spacing.tiny,
}

export const $row: TextStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginTop: spacing.extraSmall,
}
