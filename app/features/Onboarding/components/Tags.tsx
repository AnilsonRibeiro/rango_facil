import React, { FC } from "react"
import { TagType } from "../constants/tags"
import { ScrollView, ViewStyle } from "react-native"
import { Tag } from "../../../components"

interface TagsProps {
  data: Array<TagType>
}

export const Tags: FC<TagsProps> = (props) => {
  const { data } = props

  return (
    <ScrollView
      style={$tags}
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={$containerTags}
    >
      {data.map((item) => (
        <Tag key={item.id} {...item} />
      ))}
    </ScrollView>
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
