import React, { FC, useEffect } from "react"
import { TagType } from "../constants/tags"
import { ScrollView, StyleProp, ViewStyle, useWindowDimensions } from "react-native"
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
  headerComponent?: React.ReactNode

  scrollStyle?: ViewStyle

  variant?: "default" | "rectangular"
}

export const Tags: FC<TagsProps> = (props) => {
  const { data, headerComponent, variant = "default", scrollStyle, ...rest } = props

  const window = useWindowDimensions()

  const INITIAL_POSITION = window.height / 2 - 166 / 2

  const position = useSharedValue(INITIAL_POSITION)

  const animatedPosition = useAnimatedStyle(() => {
    return {
      opacity: position.value === INITIAL_POSITION ? 0 : 1,
      transform: [{ translateY: position.value }],
    }
  })

  const $viewStyle = [$tags, animatedPosition, scrollStyle] as StyleProp<ViewStyle>

  useEffect(() => {
    delay(100).then(
      () => (position.value = withTiming(0, { duration: timing.quick, easing: Easing.linear })),
    )
  }, [])

  return (
    <Animated.View style={$viewStyle}>
      {headerComponent && headerComponent}
      <ScrollView
        style={$content}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={$containerTags}
      >
        {data.map((item) => (
          <Tag key={item.id} variant={variant} {...item} {...rest} />
        ))}
      </ScrollView>
    </Animated.View>
  )
}

const $containerTags: ViewStyle = {
  alignItems: "center",
  justifyContent: "space-evenly",
  flexDirection: "column",
  flexWrap: "wrap",
}

const $content: ViewStyle = {
  minHeight: "100%",
}

const $tags: ViewStyle = {
  maxHeight: 166,
  height: 166,
}
