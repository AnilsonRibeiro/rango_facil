import React, { FC, useEffect } from "react"
import { TagType } from "../constants/tags"
import { ViewStyle, useWindowDimensions } from "react-native"
import { Tag } from "../../../components"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { timing } from "../../../theme"
import { delay } from "../../../utils/delay"

interface TagsProps {
  data: Array<TagType>
}

export const Tags: FC<TagsProps> = (props) => {
  const { data } = props

  const window = useWindowDimensions()

  const INITIAL_POSITION = window.height / 2 - 166 / 2

  const position = useSharedValue(INITIAL_POSITION)

  const animatedPosition = useAnimatedStyle(() => {
    return {
      opacity: position.value === INITIAL_POSITION ? 0 : 1,
      transform: [{ translateY: position.value }],
    }
  })

  useEffect(() => {
    delay(100).then(
      () => (position.value = withTiming(0, { duration: timing.quick, easing: Easing.linear })),
    )
  }, [])

  return (
    <Animated.ScrollView
      style={[$tags, animatedPosition]}
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={$containerTags}
    >
      {data.map((item) => (
        <Tag key={item.id} {...item} />
      ))}
    </Animated.ScrollView>
  )
}

const $containerTags: ViewStyle = {
  alignItems: "center",
  justifyContent: "space-evenly",
  flexDirection: "column",
  flexWrap: "wrap",
}

const $tags: ViewStyle = {
  flex: 1,
  maxHeight: 166,
  height: 166,
  marginTop: 24,
}
