import { useContext } from "react"
import { AuthenticationContext } from "../context/Authentication"
import { IAuthenticationContext } from "../context/Authentication/types"

export const useAuthentication = (): IAuthenticationContext => {
  const context = useContext(AuthenticationContext)

  return context
}
