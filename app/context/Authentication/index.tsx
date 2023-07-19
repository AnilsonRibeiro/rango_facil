import React, { FC, createContext, useCallback, useState } from "react"
import { IAuthenticationContext, IAuthenticationProviderProps, User } from "./types"
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"
import { useCreateAccount } from "../../features/Onboarding/services/hooks/useCreateAccount"
import { saveString } from "../../utils/storage"
import { api } from "../../services/api"
import { getProfile } from "../../features/Onboarding/services/api/getProfile"

export const AuthenticationContext = createContext<IAuthenticationContext>(
  {} as IAuthenticationContext,
)

export const AuthenticationProvider: FC<IAuthenticationProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const { mutateAsync } = useCreateAccount()

  const onGetProfile = () => {
    return getProfile()
  }

  const googleOAuth = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      return GoogleSignin.signIn()
    } catch (error) {
      throw new Error(error)
    }
  }

  const login = useCallback(
    async ({
      email,
      id,
      name,
      avatar,
      idToken,
    }: {
      id: string
      name: string
      email: string
      avatar?: string
      idToken: string
    }) => {
      try {
        await mutateAsync({
          name,
          email,
          birthday: "1990-01-01",
          socialType: "GOOGLE",
          socialUserId: id,
          userFoodProfiles: ["clk92f8d3000hv7ve3euizyy8"],
          userAllergies: ["clk92f8ck0000v7veweq6j52y"],
          avatar,
        })

        api.setAuthorizationToken(idToken)
        await saveString("rango_facil:accessToken", idToken)

        const { data } = await onGetProfile()

        setUser({
          id: data.id,
          birthday: data.birthday,
          email: data.email,
          name: data.name,
          avatar: data?.avatar,
          userFoodProfiles: data.userFoodProfiles,
          userAllergies: data.userAllergies,
        })

        console.tron.log("USER", {
          id: data.id,
          birthday: data.birthday,
          email: data.email,
          name: data.name,
          avatar: data?.avatar,
          userFoodProfiles: data.userFoodProfiles,
          userAllergies: data.userAllergies,
        })
      } catch (error) {
        console.log(error)
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          console.log(error)
        }

        throw new Error(error)
      }
    },
    [],
  )

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        login,
        googleOAuth,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
