import { api } from "../../../../services/api"

interface IResponse {
  id: string
  email: string
  name: string
  birthday: Date
  avatar: string | null
  userAllergies: []
  userFoodProfiles: []
}

export async function getProfile() {
  return api.client.get<IResponse>("/accounts")
}
