import React, { FC, useEffect } from "react"
import { View, ViewStyle, useWindowDimensions } from "react-native"
import { colors, timing } from "../../../../theme"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

interface CellProps {
  completed?: boolean
}

export const Cell: FC<CellProps> = ({ completed = false }) => {
  const size = useSharedValue(0)

  const { width } = useWindowDimensions()

  const SIZE_MAX = (width / 10) * 3 // 30% of the screen

  const animatedWidthCompleted = useAnimatedStyle(() => {
    return {
      width: size.value,
    }
  })

  useEffect(() => {
    if (completed) {
      size.value = withTiming(SIZE_MAX, {
        duration: timing.quick,
        easing: Easing.linear,
      })
    } else {
      size.value = withTiming(0, {
        duration: timing.quick,
        easing: Easing.linear,
      })
    }
  }, [completed])

  return (
    <View style={$root}>
      <Animated.View style={[$content, animatedWidthCompleted]} />
    </View>
  )
}

const $root: ViewStyle = {
  flex: 1,
  height: 8,
  maxWidth: "30%",
  backgroundColor: colors.palette.neutral300,
  borderRadius: 9999,
  overflow: "hidden",
}

const $content: ViewStyle = {
  backgroundColor: colors.palette.primary300,
  height: "100%",
  width: "0%",
}
