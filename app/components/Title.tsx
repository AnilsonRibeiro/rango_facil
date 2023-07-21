import React, { useState } from "react"
import { LayoutChangeEvent, View, ViewStyle, Platform } from "react-native"
import { Text } from "./Text"
import { colors } from "../theme"

interface TitleProps {
  text: string
}

export function Title(props: TitleProps) {
  const { text } = props
  const [width, setWidth] = useState(0)

  const $viewStyle = (width: number) =>
    Platform.OS === "ios"
      ? ({
          height: 0,
          width,
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderLeftWidth: width,
          borderStyle: "solid",

          backgroundColor: colors.transparent,
          borderTopColor: colors.transparent,
          borderBottomColor: colors.transparent,
          borderLeftColor: colors.palette.primary300,

          borderRadius: 9999,
        } as ViewStyle)
      : ({
          height: 0,
          width,
          borderBottomWidth: 2,
          borderLeftWidth: width,
          borderStyle: "solid",
          borderLeftColor: colors.palette.primary300,
          borderRadius: 9999,
        } as ViewStyle)

  const getWidth = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width)
  }
  return (
    <View style={$headerTags} onLayout={(e) => getWidth(e)}>
      <Text text={text} preset="subheading" />
      <View style={$viewStyle(width)} />
    </View>
  )
}

const $headerTags: ViewStyle = {
  alignSelf: "flex-start",
}
