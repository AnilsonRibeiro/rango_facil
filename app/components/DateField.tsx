import React, { useEffect, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import DatePicker from "react-native-date-picker"

import { Icon } from "./Icon"
import { colors, spacing } from "../theme"
import { Text } from "./Text"

export type DateFieldProps = {
  value?: Date
  onChange?: (date: Date) => void
}

export function DateField(props: DateFieldProps) {
  const { value, onChange, ...rest } = props
  const [date, setDate] = useState<Date>(() => value ?? new Date())
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  useEffect(() => {
    onChange?.(date)
  }, [date])

  const dateFormatted = date.toLocaleDateString("pt-BR")
  return (
    <View style={$root}>
      <Text text={dateFormatted} style={$text} />

      <Icon icon="pen" size={24} onPress={handleOpen} />
      <DatePicker
        modal
        mode="date"
        maximumDate={new Date()}
        open={isOpen}
        date={date}
        onConfirm={(date) => {
          setIsOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setIsOpen(false)
        }}
        {...rest}
      />
    </View>
  )
}

const $root: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  alignItems: "center",
  justifyContent: "flex-start",
}

const $text: TextStyle = {
  flex: 1,
  backgroundColor: colors.transparent,
  color: colors.palette.neutral100,
  fontSize: 18,
  lineHeight: 24,
  marginRight: spacing.medium,
}
