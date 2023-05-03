import { IDataBase } from "../types"
import { User as UserModel } from "../../../../models/User"

import firestore from "@react-native-firebase/firestore"
import { UserDataType } from "./types"

class User implements IDataBase {
  async create(data: UserModel): Promise<void> {
    const { id, ...rest } = data
    console.log("CLASS", "chamou")
    try {
      await firestore().collection("users").doc(id).set({
        name: rest.name,
        email: rest.email,
        avatar: rest.avatar,
        dateOfBirth: rest.dateOfBirth,
      })
    } catch (error) {
      console.log("ERROR", error)
    }
  }

  async read(id: Pick<UserModel, "id">): Promise<UserDataType> {
    const userData = await firestore()
      .collection("users")
      .doc(id as unknown as string)
      .get()

    return userData.data() as UserDataType
  }

  async update(data: { [x: string]: any }): Promise<void> {
    await firestore()
      .collection("users")
      .doc()
      .update({
        ...data,
      })
  }

  async delete(id: Pick<UserModel, "id">): Promise<void> {
    await firestore()
      .collection("users")
      .doc(id as unknown as string)
      .delete()
  }
}

const user = new User()
export { user }
