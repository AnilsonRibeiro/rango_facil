import { UseQueryOptions, UseQueryResult, useQuery } from "react-query"
import { IAllergy, getAllergies } from "../api/getAllergies"

export const useGetAllergies = (
  options?: UseQueryOptions<IAllergy[]>,
): UseQueryResult<IAllergy[]> => {
  return useQuery("allergies", () => getAllergies(), { ...options })
}
