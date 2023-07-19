import { api } from "../../../../services/api"

export type FoodProfile = {
  id: string
  name: string
}

async function getFoodProfiles(): Promise<FoodProfile[]> {
  const { data } = await api.client.get<FoodProfile[]>("/food-profiles")

  return data
}

export { getFoodProfiles }
