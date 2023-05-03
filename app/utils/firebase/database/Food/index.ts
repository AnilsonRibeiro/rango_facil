import firestore from "@react-native-firebase/firestore"
import { IDataBase } from "../types"
import { CreateFoodDTO } from "./types"

class Food implements IDataBase {
  async create(data: CreateFoodDTO): Promise<any> {
    const userFoods = firestore().collection(`foods`).doc(data.user_id)

    const oldData = (await userFoods.get()).data()

    if (oldData) {
      return userFoods.update({
        [data.id]: {
          id: data.id,
          name: data.name,
        },
        ...oldData,
      })
    }

    userFoods.set({
      [data.id]: {
        id: data.id,
        name: data.name,
      },
    })
  }

  read(data: any): Promise<any> {
    throw new Error("Method not implemented.")
  }

  update(data: any): Promise<any> {
    throw new Error("Method not implemented.")
  }

  delete(data: any): Promise<any> {
    throw new Error("Method not implemented.")
  }
}

const food = new Food()

export { food }
