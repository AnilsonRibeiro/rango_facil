import React from "react"
import { ImageSourcePropType, StyleProp, View, ViewStyle } from "react-native"
import { colors } from "../theme"
import { AutoImage } from "./AutoImage"
import { Icon } from "./Icon"

type PresetAvatarType = keyof typeof $viewPresets

export type AvatarProps = {
  // URL image
  source?: ImageSourcePropType
  preset?: PresetAvatarType
}

export function Avatar(props: AvatarProps) {
  const { source, preset = "medium" } = props

  function $viewStyles({ preset }) {
    return [$viewPresets[preset]] as StyleProp<ViewStyle>
  }

  const finalSize = preset === "small" ? 56 : preset === "medium" ? 100 : 150

  return (
    <View style={$viewStyles({ preset })}>
      {source ? (
        <AutoImage source={source} resizeMode="cover" maxHeight={finalSize} maxWidth={finalSize} />
      ) : (
        <Icon icon="user" size={70} />
      )}
    </View>
  )
}

const $baseStyles: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: 100,
  height: 100,
  borderRadius: 9999,
  backgroundColor: colors.palette["neutral100_50%"],

  overflow: "hidden",
}

const $mediumPresetStyle: ViewStyle = {
  borderWidth: 2,
  borderColor: colors.palette.neutral100,
}

const $smallPresetStyle: ViewStyle = {
  width: 56,
  height: 56,
}

const $largePresetStyle: ViewStyle = {
  width: 150,
  height: 150,
}

const $viewPresets = {
  small: [$baseStyles, $smallPresetStyle] as StyleProp<ViewStyle>,
  medium: [$baseStyles, $mediumPresetStyle] as StyleProp<ViewStyle>,
  large: [$baseStyles, $largePresetStyle] as StyleProp<ViewStyle>,
}
