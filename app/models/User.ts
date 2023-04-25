import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */

export const UserModel = types
  .model("User")
  .props({
    id: types.identifier,
    name: types.string,
    email: types.string,
    avatar: types.string,
    token: types.string,
    refreshToken: types.string,
    dateOfBirth: types.optional(types.Date, new Date()),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get fullName() {
      return self.name
    },

    get photo() {
      return self.avatar
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setDateOfBirth(value: Date) {
      self.dateOfBirth = value
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
