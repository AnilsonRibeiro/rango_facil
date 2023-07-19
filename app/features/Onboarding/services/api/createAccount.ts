import { api } from "../../../../services/api"

type SocialType = "GOOGLE" | "FACEBOOK"

export interface ICreateAccountParams {
  name: string
  email: string
  avatar?: string
  socialType: SocialType
  socialUserId: string
  userFoodProfiles: string[]
  userAllergies?: string[]
  birthday: string
}
export async function createAccount(params: ICreateAccountParams) {
  return api.client.post("/accounts", params)
}
