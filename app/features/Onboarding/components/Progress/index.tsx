import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { spacing } from "../../../../theme"
import { Cell } from "./Cell"

export type StepType = {
  id: string
  completed: boolean
}

interface ProgressProps {
  steps: Array<StepType>
}

export const Progress: FC<ProgressProps> = (props) => {
  const { steps } = props

  return (
    <View style={$root}>
      {steps.map((step) => (
        <Cell key={step.id} completed={step.completed} />
      ))}
    </View>
  )
}

const $root: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  marginTop: spacing.large,
}
