import React, { FC, createContext, useCallback, useEffect, useState } from "react"
import { IAuthenticationContext, IAuthenticationProviderProps, User } from "./types"
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"
import { useCreateAccount } from "../../features/Onboarding/services/hooks/useCreateAccount"
import { clear, load, save } from "../../utils/storage"
import { api } from "../../services/api"
import { getProfile } from "../../features/Onboarding/services/api/getProfile"

export const AuthenticationContext = createContext<IAuthenticationContext>(
  {} as IAuthenticationContext,
)

export const AuthenticationProvider: FC<IAuthenticationProviderProps> = ({
  children,
  hideSplashScreen,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [rehydrated, setRehydrated] = useState<boolean>(false)

  const { mutateAsync } = useCreateAccount()

  const onStart = async () => {
    const data = await load("rango_facil:user_data")
    console.log(data)
    if (data) {
      setUser(data as User)
    }
    setRehydrated(true)
    hideSplashScreen()
  }

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
      birthday,
      name,
      avatar,
      idToken,
      userFoodProfiles,
      userAllergies,
    }: {
      id: string
      birthday: string
      name: string
      email: string
      avatar?: string
      userFoodProfiles: string[]
      userAllergies?: string[]
      idToken: string
    }) => {
      try {
        await mutateAsync({
          name,
          email,
          birthday,
          socialType: "GOOGLE",
          socialUserId: id,
          userFoodProfiles,
          userAllergies,
          avatar,
        })

        await api.setAuthorizationToken(idToken)

        const { data } = await onGetProfile()

        const userData = {
          id: data.id,
          birthday: data.birthday,
          email: data.email,
          name: data.name,
          avatar: data?.avatar,
          userFoodProfiles: data.userFoodProfiles,
          userAllergies: data.userAllergies,
        }
        setUser(userData)
        await save("rango_facil:user_data", userData)
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

  const logout = useCallback(async () => {
    await clear()
    setUser(null)
  }, [])

  useEffect(() => {
    if (!rehydrated) {
      onStart()
    }
  }, [])
  return (
    <AuthenticationContext.Provider
      value={{
        rehydrated,
        user,
        login,
        logout,
        googleOAuth,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
