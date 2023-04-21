import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"

import { Icon } from "./Icon"
import { colors, spacing } from "../theme"

export type TextFieldForEditProps = TextInputProps

export const Base: ForwardRefRenderFunction<TextInput, TextFieldForEditProps> = (props, ref) => {
  const { editable = false, ...rest } = props
  const [isEditable, setIsEditable] = useState<boolean>(editable)
  const inputRef = useRef<TextInput>(null)

  const handleToggleEdit = () => {
    setIsEditable((s) => !s)
  }
  useImperativeHandle(ref, () => inputRef.current)

  useEffect(() => {
    isEditable && inputRef.current?.focus()
  }, [isEditable])

  return (
    <View style={$root}>
      <TextInput
        ref={inputRef}
        style={$input}
        {...rest}
        editable={isEditable}
        placeholderTextColor={colors.palette.neutral100}
      />

      <Icon icon="pen" size={24} onPress={handleToggleEdit} />
    </View>
  )
}

const $root: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  alignItems: "center",
  justifyContent: "flex-start",
}

const $input: TextStyle = {
  backgroundColor: colors.transparent,
  color: colors.palette.neutral100,
  fontSize: 18,
  lineHeight: 24,
  marginRight: spacing.medium,
}

export const TextFieldForEdit = forwardRef(Base)
