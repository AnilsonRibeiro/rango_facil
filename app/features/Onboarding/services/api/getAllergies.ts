import { api } from "../../../../services/api"

export type IAllergy = {
  id: string
  name: string
}

async function getAllergies() {
  const { data } = await api.client.get<IAllergy[]>("/allergies")

  return data
}

export { getAllergies }
