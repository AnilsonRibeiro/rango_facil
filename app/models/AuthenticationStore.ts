import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { User, UserModel } from "./User"
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    user: types.maybeNull(UserModel),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.user.token
    },
  }))
  .actions((self) => ({
    setUser(user: User) {
      self.user = user
    },
  }))
  .actions((self) => ({
    logout() {
      self.user = null
    },

    async signUp() {
      try {
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()
        const user = UserModel.create({
          id: userInfo.user.id,
          name: userInfo.user.name,
          email: userInfo.user.email,
          avatar: userInfo.user.photo,
          token: userInfo.idToken,
          refreshToken: userInfo.serverAuthCode,
        })

        self.setUser(user)
      } catch (error) {
        console.log(error)
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    },
  }))
  .preProcessSnapshot((snapshot) => {
    // remove sensitive data from snapshot to avoid secrets
    // being stored in AsyncStorage in plain text if backing up store
    const { ...rest } = snapshot // eslint-disable-line @typescript-eslint/no-unused-vars

    // see the following for strategies to consider storing secrets on device
    // https://reactnative.dev/docs/security#storing-sensitive-info

    return rest
  })

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
