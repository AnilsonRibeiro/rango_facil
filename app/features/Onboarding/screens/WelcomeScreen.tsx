import React, { FC, memo, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, TextStyle, ViewStyle } from "react-native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { Button, Screen, Text } from "../../../components"
import { colors, spacing, timing } from "../../../theme"
import { ProgressSteps } from "../../../components/ProgressSteps"

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated"
import { OnboardingStackParamList } from "../navigation/OnboardingNavigator"
import { useNavigation } from "@react-navigation/native"

const welcomeStepOne = require("../../../../assets/images/onboarding/welcome-background.png")
const welcomeStepTwo = require("../../../../assets/images/onboarding/welcome-step-2-background.png")
const welcomeStepThree = require("../../../../assets/images/onboarding/welcome-step-3-background.png")

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Welcome: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Welcome" component={WelcomeScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore

export type StepType = {
  id: number | string
  image: any
  title: string
  description: string
}

const steps: Array<StepType> = [
  {
    id: 1,
    image: welcomeStepOne,
    title: "Rango Fácil",
    description: "Descubra novas receitas com o que já tem em casa e experimente novos sabores.",
  },

  {
    id: 2,
    image: welcomeStepTwo,
    title: "Rango Fácil",
    description: "Descubra novas receitas com o que já tem em casa e experimente novos sabores.",
  },
  {
    id: 3,
    image: welcomeStepThree,
    title: "Rango Fácil",
    description:
      "Aproveite ao máximo o que tem na sua despensa e crie pratos deliciosos com facilidade.",
  },
]

const WelcomeTitle: FC<{ text: string }> = memo(
  function Title({ text }) {
    return <Text preset="heading" text={text} style={[$title, $text]} />
  },
  (prevProps, nextProps) => prevProps.text === nextProps.text,
)

const WelcomeDescription: FC<{ text: string }> = memo(
  function Title({ text }) {
    return <Text preset="default" text={text} style={$text} />
  },
  (prevProps, nextProps) => prevProps.text === nextProps.text,
)

export const WelcomeScreen: FC<StackScreenProps<OnboardingStackParamList, "Welcome">> = observer(
  function WelcomeScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation<StackNavigationProp<OnboardingStackParamList>>()
    const [currentStep, setCurrentStep] = useState(0)

    const handleNextStep = () => {
      if (currentStep === steps.length - 1) {
        navigation.replace("SignUp")
        return
      }
      setCurrentStep(currentStep + 1)
    }
    const opacity = useSharedValue(1)

    const screenAnimation = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
      }
    })

    useEffect(() => {
      opacity.value = withTiming(
        0.8,
        {
          duration: timing.quick,
          easing: Easing.linear,
        },
        () => (opacity.value = 1),
      )
    }, [currentStep])

    return (
      <ImageBackground source={steps[currentStep].image} resizeMode="cover" style={$image}>
        <Screen
          style={$root}
          contentContainerStyle={[$container]}
          preset="auto"
          backgroundColor={colors.transparent}
          safeAreaEdges={["bottom"]}
        >
          <Animated.View style={[$animatedContainer, screenAnimation]}>
            <WelcomeTitle text={steps[currentStep].title} />
            <WelcomeDescription text={steps[currentStep].description} />
            <ProgressSteps steps={steps} currentStep={currentStep} />

            <Button text="Próximo" onPress={handleNextStep} />
          </Animated.View>
        </Screen>
      </ImageBackground>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $animatedContainer: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
  paddingHorizontal: spacing.large,
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
}

const $image: ViewStyle = {
  flex: 1,
  minHeight: "100%",
  minWidth: "100%",
}

const $title: TextStyle = {
  marginBottom: 40,
}

const $text: TextStyle = {
  textAlign: "center",
}
