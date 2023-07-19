import { UseQueryOptions, UseQueryResult, useQuery } from "react-query"
import { FoodProfile, getFoodProfiles } from "../api/getFoodProfiles"

const useGetFoodProfiles = (
  options?: UseQueryOptions<FoodProfile[], any>,
): UseQueryResult<FoodProfile[], any> => {
  return useQuery("foodProfiles", () => getFoodProfiles(), { ...options })
}

export { useGetFoodProfiles }
