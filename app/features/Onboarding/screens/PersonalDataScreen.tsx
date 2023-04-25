import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Button, Screen, Avatar, TextFieldForEdit, Tag, IconTypes } from "../../../components"
import { colors, spacing } from "../../../theme"
import { DateField } from "../../../components/DateField"
import { OnboardingStackParamList } from "../navigation/OnboardingNavigator"
import { useStores } from "../../../models"

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

type TagType = {
  id: string
  icon: IconTypes
  name: string
  preset: "default" | "medium" | "big"
}

const tags: Array<TagType> = [
  {
    id: "cogumelo",
    icon: "cogumelo",
    name: "Cogumelo",
    preset: "big",
  },
  {
    id: "feijao",
    icon: "feijao",
    name: "Feijão",
    preset: "default",
  },
  {
    id: "nozes",
    icon: "nozes",
    name: "Nozes",
    preset: "medium",
  },

  {
    id: "milho",
    icon: "milho",
    name: "Milho",
    preset: "medium",
  },

  {
    id: "salsa",
    icon: "salsa",
    name: "Salsa",
    preset: "default",
  },

  {
    id: "ovos",
    icon: "ovos",
    name: "Ovos",
    preset: "default",
  },

  {
    id: "mariscos",
    icon: "mariscos",
    name: "Maricos",
    preset: "medium",
  },
  {
    id: "gluten",
    icon: "gluten",
    name: "Glúten",
    preset: "medium",
  },

  {
    id: "peixe",
    icon: "peixe",
    name: "Peixe",
    preset: "default",
  },

  {
    id: "amendoin",
    icon: "amendoin",
    name: "Amendoim",
    preset: "big",
  },
  {
    id: "gergilim",
    icon: "gergilim",
    name: "Gergirlim",
    preset: "medium",
  },
  {
    id: "leite",
    icon: "leite",
    name: "Leite",
    preset: "default",
  },

  {
    id: "mel",
    icon: "mel",
    name: "Mel",
    preset: "default",
  },

  {
    id: "mostarda",
    icon: "mostarda",
    name: "Mostarda",
    preset: "medium",
  },

  {
    id: "soja",
    icon: "soja",
    name: "Soja",
    preset: "default",
  },

  {
    id: "sulfato",
    icon: "sulfato",
    name: "Sulfato",
    preset: "medium",
  },
  {
    id: "crustacoes",
    icon: "crustaceos",
    name: "Crustáceos",
    preset: "big",
  },
]

export const PersonalData: FC<StackScreenProps<OnboardingStackParamList, "PersonalData">> =
  observer(function PersonalData() {
    // Pull in one of our MST stores
    const { authenticationStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const avatar = authenticationStore.user.photo
    const name = authenticationStore.user.fullName
    const dateOfBirth = authenticationStore.user.dateOfBirth
    const onChangeDate = authenticationStore.user.setDateOfBirth

    return (
      <Screen
        style={$root}
        preset="fixed"
        safeAreaEdges={["top", "bottom"]}
        contentContainerStyle={$rootContent}
      >
        <View style={$progressContainer}>
          <View style={$progressCell} />
          <View style={$progressCell} />
          <View style={$progressCell} />
        </View>

        <View style={$content}>
          <View style={$wrapperAvatar}>
            <Avatar source={{ uri: avatar }} />
            <View style={$wrapperFields}>
              <TextFieldForEdit value={name} placeholder="Nome sobrenome" />
              <DateField value={dateOfBirth} onChange={onChangeDate} />
            </View>
          </View>

          <ScrollView
            style={$tags}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={$containerTags}
          >
            {tags.map((item) => (
              <Tag key={item.id} {...item} />
            ))}
          </ScrollView>
        </View>

        <View style={$wrapperButton}>
          <Button text="Continuar" />
        </View>
      </Screen>
    )
  })

const $root: ViewStyle = {
  flex: 1,
}

const $rootContent: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
}

const $progressContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  marginTop: spacing.large,
}

const $progressCell: ViewStyle = {
  flex: 1,
  height: 8,
  maxWidth: "30%",
  backgroundColor: colors.palette.neutral300,
  borderRadius: 9999,
}

const $content: ViewStyle = {
  flex: 1,

  justifyContent: "flex-start",
  paddingTop: "35%",
}

const $wrapperAvatar: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.large,
}

const $wrapperFields: ViewStyle = {
  flex: 1,
  marginLeft: spacing.medium,
}

const $wrapperButton: ViewStyle = {
  paddingHorizontal: spacing.large,
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
