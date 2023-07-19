import { useMutation, UseMutationOptions } from "react-query"
import { ICreateAccountParams, createAccount } from "../api/createAccount"

export const useCreateAccount = (options?: UseMutationOptions<any, any, ICreateAccountParams>) => {
  return useMutation("createAccount", (data: ICreateAccountParams) => createAccount(data), {
    ...options,
  })
}
