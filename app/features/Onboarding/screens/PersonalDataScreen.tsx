import React, { FC, useReducer, useState } from "react"
import { Alert, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Button, Screen, Avatar, TextFieldForEdit, DateField, Title } from "../../../components"

import { OnboardingStackParamList } from "../navigation/OnboardingNavigator"

import { Tags } from "../components/Tags"
import { TagType, CategoryType, tags } from "../constants/tags"

import { Progress, StepType } from "../components/Progress"
import { RouteProp, useRoute } from "@react-navigation/native"
import { spacing } from "../../../theme"
import { useGetFoodProfiles } from "../services/hooks/useGetFoodProfiles"
import { useGetAllergies } from "../services/hooks/useGetAllergies"
import { toPascalCase } from "../../../utils/normalize/toPascalCase"
import { useAuthentication } from "../../../hooks/useAuthentication"

enum ActionsEnum {
  COMPLETED_STEP = "completedStep",
}

type ActionsType = {
  type: ActionsEnum
  payload: number
}

const completedStepReduce = (
  state: { steps: StepType[]; currentStep: number },
  action: ActionsType,
) => {
  const { type, payload } = action

  switch (type) {
    case ActionsEnum.COMPLETED_STEP:
      return {
        steps: state.steps.map((step, index) => {
          if (index === payload - 1) {
            return { ...step, completed: true }
          }
          return step
        }),
        currentStep: payload,
      }
  }
}

export const PersonalData: FC<StackScreenProps<OnboardingStackParamList, "PersonalData">> = () => {
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date())
  const [categoriesSelected, setCategoriesSelected] = useState<CategoryType[]>([])
  const [allergiesSelected, setAllergiesSelected] = useState<TagType[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { login } = useAuthentication()

  const { params } = useRoute<RouteProp<OnboardingStackParamList, "PersonalData">>()

  const { data: categories } = useGetFoodProfiles({
    retry: 3,
    initialData: [],
    onError: (error) => {
      console.log(error)
    },
  })

  const { data: allergies } = useGetAllergies({
    retry: 3,
    initialData: [],
    onError: (error) => {
      console.log(error)
    },
  })

  const [state, dispatch] = useReducer(completedStepReduce, {
    steps: [
      { id: "1", completed: false },
      { id: "2", completed: false },
      { id: "3", completed: false },
    ],
    currentStep: 0,
  })

  const handleCompletedStep = () => {
    dispatch({ type: ActionsEnum.COMPLETED_STEP, payload: state.currentStep + 1 })
  }

  const handlePressFoodTag = (item: TagType) => {
    const selectedItem = allergiesSelected.find((allergy) => allergy.id === item.id)

    if (selectedItem && allergiesSelected.length > 0) {
      return setAllergiesSelected((prev) => prev.filter((allergy) => allergy.id !== item.id))
    }

    setAllergiesSelected((prev) => [...prev, item])
  }

  const handlePressFoodOption = (item: CategoryType) => {
    const selectedItem = categoriesSelected.find((category) => category.id === item.id)

    if (selectedItem) {
      return setCategoriesSelected((prev) => prev.filter((category) => category.id !== item.id))
    }

    setCategoriesSelected((prev) => [...prev, item])
  }

  const handleCreateAccount = async () => {
    setIsLoading(true)
    try {
      await login({
        id: params.id,
        email: params.email,
        name: params.name,
        idToken: params.idToken,
        avatar: params.avatar,
        birthday: dateOfBirth.toISOString(),
        userFoodProfiles: categoriesSelected.map((item) => item.id),
        userAllergies: allergies.map((item) => item.id),
      })
      Alert.alert("Conta criada com sucesso!")
    } catch (error) {
      Alert.alert("Erro ao criar conta", error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const isSelectFood = (id: string): boolean => {
    return allergiesSelected.find((allergy) => allergy.id === id) !== undefined
  }

  const isSelectFoodOption = (id: string): boolean => {
    return categoriesSelected.find((category) => category.id === id) !== undefined
  }

  const onChangeDate = (data: Date) => {
    setDateOfBirth(data)
  }

  const showCategories = state.steps[0].completed
  const showTags = state.steps[1].completed

  const buttonIsDisabled = () => {
    if (state.currentStep === 0) {
      return false
    }

    if (state.currentStep === 1) {
      return categoriesSelected.length === 0
    }

    return false
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$rootContent}>
      <Progress steps={state.steps} />

      <View style={$content}>
        <View style={$wrapperAvatar}>
          <Avatar source={{ uri: params?.avatar }} />
          <View style={$wrapperFields}>
            <TextFieldForEdit
              value={params.name}
              placeholder="Nome e sobrenome"
              numberOfLines={1}
            />
            <DateField value={dateOfBirth} onChange={onChangeDate} />
          </View>
        </View>

        {showCategories && (
          <Tags
            data={categories?.map((category) => ({
              id: category.id,
              name: toPascalCase(category.name),
            }))}
            isSelect={isSelectFoodOption}
            onPressTag={handlePressFoodOption}
            variant="rectangular"
            scrollStyle={$overrideScrollViewStyleCategories}
            headerComponent={<Title text="Perfil alimentar:" />}
          />
        )}

        {showTags && (
          <Tags
            data={allergies?.map((allergy) => ({
              id: allergy.id,
              icon: tags[toPascalCase(allergy.name)].icon,
              preset: tags[toPascalCase(allergy.name)].preset,
              name: toPascalCase(allergy.name),
            }))}
            isSelect={isSelectFood}
            onPressTag={handlePressFoodTag}
            headerComponent={<Title text="Alergias:" />}
            scrollStyle={$overrideScrollViewStyleTags}
          />
        )}
      </View>
      <View style={$wrapperButton}>
        <Button
          text="Continuar"
          onPress={state.currentStep === 2 ? handleCreateAccount : handleCompletedStep}
          disabled={buttonIsDisabled()}
          loading={isLoading}
        />
      </View>
    </Screen>
  )
}

const $rootContent: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
}

const $content: ViewStyle = {
  flex: 1,

  justifyContent: "flex-start",

  paddingTop: "15%",
  paddingHorizontal: spacing.large,
}

const $wrapperAvatar: ViewStyle = {
  flexDirection: "row",
}

const $wrapperFields: ViewStyle = {
  flex: 1,
  marginLeft: spacing.medium,
}

const $wrapperButton: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $overrideScrollViewStyleCategories: ViewStyle = {
  height: 70,
  marginTop: spacing.large,
}

const $overrideScrollViewStyleTags: ViewStyle = {
  minHeight: 170,
  height: 170,

  marginTop: spacing.huge,
}
