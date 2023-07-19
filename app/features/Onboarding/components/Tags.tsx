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

import { observer } from "mobx-react-lite"

interface TagsProps {
  data: Array<TagType>
  headerComponent?: React.ReactNode
  onPressTag?: (item: TagType) => void
  isSelect?: (id: string) => boolean
  scrollStyle?: ViewStyle

  variant?: "default" | "rectangular"
}

export const Tags: FC<TagsProps> = observer(function Tags(props) {
  const {
    data,
    headerComponent,
    variant = "default",
    scrollStyle,
    onPressTag,
    isSelect,
    ...rest
  } = props

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
        {data &&
          data.map((item) => (
            <Tag
              key={item.id}
              variant={variant}
              onPress={() => onPressTag(item)}
              selected={isSelect(item.id)}
              {...item}
              {...rest}
            />
          ))}
      </ScrollView>
    </Animated.View>
  )
})

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
