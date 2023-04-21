import React, { useEffect } from "react"
import { ViewStyle } from "react-native"
import { colors, timing } from "../../theme"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

interface ItemProps {
  isCurrent?: boolean
}

export function Item(props: ItemProps) {
  const { isCurrent } = props

  const size = useSharedValue(8)

  const animatedCurrentStep = useAnimatedStyle(() => {
    return {
      width: size.value,
      backgroundColor: size.value === 8 ? colors.palette.primary100 : colors.palette.primary400,
    }
  })

  useEffect(() => {
    if (isCurrent) {
      size.value = withTiming(64, { duration: timing.quick, easing: Easing.linear })
    } else {
      size.value = withTiming(8)
    }
  }, [isCurrent])

  return <Animated.View style={[$root, animatedCurrentStep]} />
}

const $root: ViewStyle = {
  borderRadius: 9999,
  height: 8,
  width: 8,
}
