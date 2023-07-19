import { ReactNode } from "react"
import { User as GoogleUser } from "@react-native-google-signin/google-signin"
type User = {
  id: string
  name: string
  email: string
  avatar?: string
  birthday: Date
  userFoodProfiles: string[]
  userAllergies?: string[]
}

type LoginDataType = {
  id: string
  name: string
  email: string
  avatar?: string
  idToken: string
}

interface IAuthenticationContext {
  user: User | null
  login: (data: LoginDataType) => Promise<void>
  googleOAuth: () => Promise<GoogleUser>
}

interface IAuthenticationProviderProps {
  children: ReactNode
}

export { IAuthenticationContext, IAuthenticationProviderProps, User }
