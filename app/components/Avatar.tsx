import React from "react"
import { ImageSourcePropType, View, ViewStyle } from "react-native"
import { colors } from "../theme"
import { AutoImage } from "./AutoImage"
import { Icon } from "./Icon"

export type AvatarProps = {
  // URL image
  source?: ImageSourcePropType
}

export function Avatar(props: AvatarProps) {
  const { source } = props

  return (
    <View style={$root}>
      {source ? (
        <AutoImage source={source} resizeMode="cover" maxHeight={90} maxWidth={90} />
      ) : (
        <Icon icon="user" size={70} />
      )}
    </View>
  )
}

const $root: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: 100,
  height: 100,
  borderRadius: 9999,
  backgroundColor: colors.palette["neutral100_50%"],
  borderWidth: 2,
  borderColor: colors.palette.neutral100,
  overflow: "hidden",
}
