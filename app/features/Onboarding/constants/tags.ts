import { IconTypes } from "../../../components"

export type TagType = {
  id: string
  icon?: IconTypes
  name: string
  preset?: "default" | "medium" | "big"
}

export const tags = {
  Cogumelo: {
    icon: "cogumelo",
    preset: "big",
  },
  Feijão: {
    icon: "feijao",
    preset: "default",
  },
  Nozes: {
    icon: "nozes",
    preset: "medium",
  },

  Milho: {
    icon: "milho",
    preset: "medium",
  },

  Salsa: {
    icon: "salsa",
    preset: "default",
  },

  Ovos: {
    icon: "ovos",
    preset: "default",
  },

  Mariscos: {
    icon: "mariscos",
    preset: "medium",
  },
  Gluten: {
    icon: "gluten",
    preset: "medium",
  },

  Peixe: {
    icon: "peixe",
    preset: "default",
  },

  Amendoim: {
    icon: "amendoim",
    preset: "big",
  },
  Gergelim: {
    icon: "gergelim",
    preset: "medium",
  },
  Leite: {
    icon: "leite",
    preset: "default",
  },

  Mel: {
    icon: "mel",
    preset: "default",
  },

  Mostarda: {
    icon: "mostarda",
    preset: "medium",
  },

  Sulfato: {
    icon: "sulfato",
    preset: "medium",
  },

  Soja: {
    icon: "soja",
    preset: "default",
  },

  Crustáceos: {
    icon: "crustaceos",
    preset: "big",
  },
}

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
