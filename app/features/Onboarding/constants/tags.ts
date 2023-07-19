import { IconTypes } from "../../../components"

export type TagType = {
  id: string
  icon?: IconTypes
  name: string
  preset?: "default" | "medium" | "big"
}

export const tags: Array<TagType> = [
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
    id: "sulfato",
    icon: "sulfato",
    name: "Sulfato",
    preset: "medium",
  },

  {
    id: "soja",
    icon: "soja",
    name: "Soja",
    preset: "default",
  },

  {
    id: "crustacoes",
    icon: "crustaceos",
    name: "Crustáceos",
    preset: "big",
  },
]

export type CategoryType = {
  id: string
  name: string
}

export const categories: CategoryType[] = [
  {
    id: "1",
    name: "Vegan",
  },

  {
    id: "2",
    name: "Vegetariano",
  },

  {
    id: "3",
    name: "Sem glúten",
  },

  {
    id: "4",
    name: "Sem acuçar",
  },

  {
    id: "5",
    name: "Carnivoro",
  },

  {
    id: "6",
    name: "Pescetariano",
  },
]
