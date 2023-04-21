import React from "react"
import { View, ViewStyle } from "react-native"
import { spacing } from "../../theme"
import { Item } from "./Item"

interface ProgressStepsProps {
  steps: string[]
  currentStep: number
}

export function ProgressSteps(props: ProgressStepsProps) {
  const { steps, currentStep } = props
  return (
    <View style={$root}>
      {steps.map((step, index) => (
        <Item key={step} isCurrent={index === currentStep} />
      ))}
    </View>
  )
}

const $root: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: spacing.medium,
  marginBottom: spacing.large,
  width: 88,
}
