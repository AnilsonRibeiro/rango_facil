import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { Food, FoodModel } from "./Food"
import { FoodOption, FoodOptionModel } from "./FoodOption"
import { user as userClass, food as foodClass } from "../utils/firebase/database"

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

    foods: types.array(FoodModel),
    foodsOptions: types.array(FoodOptionModel),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get fullName() {
      return self.name
    },

    get shortName() {
      const name = self.name.split(" ")
      return `${name[0]} ${name[name.length - 1]}`
    },

    get photo() {
      return self.avatar
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .volatile(() => ({
    loading: false,
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setLoadingState(state: boolean) {
      self.loading = state
    },
  }))
  .actions((self) => ({
    setDateOfBirth(value: Date) {
      self.dateOfBirth = value
    },
  }))
  // Food
  .actions((self) => ({
    existsFood(id: string) {
      return self.foods.find((f) => f.id === id)
    },

    addFood(food: Food) {
      const foodExists = self.foods.find((f) => f.id === food.id)

      if (!foodExists) {
        const newFood = FoodModel.create(food)
        self.foods.push(newFood)
      }
    },

    removeFood(id: string) {
      const foodExists = self.foods.find((f) => f.id === id)

      if (foodExists) {
        self.foods.remove(foodExists)
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setDateOfBirth(value: Date) {
      self.dateOfBirth = value
    },
  }))
  // Food Options
  .actions((self) => ({
    existsFoodOption(id: string) {
      return self.foodsOptions.find((f) => f.id === id)
    },

    addFoodOption(foodOption: FoodOption) {
      const foodExists = self.foodsOptions.find((f) => f.id === foodOption.id)

      if (!foodExists) {
        const newFood = FoodOptionModel.create(foodOption)
        self.foodsOptions.push(newFood)
      }
    },

    removeFoodOption(id: string) {
      const foodExists = self.foodsOptions.find((f) => f.id === id)

      if (foodExists) {
        self.foodsOptions.remove(foodExists)
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async createAccount() {
      self.setLoadingState(true)

      const userData = {
        id: self.id,
        name: self.name,
        email: self.email,
        avatar: self.avatar,
        dateOfBirth: self.dateOfBirth,
      } as User

      console.log(userData)
      await userClass.create(userData)

      for (const food of self.foods) {
        await foodClass.create({
          id: food.id,
          name: food.name,
          user_id: self.id,
        })
      }

      self.setLoadingState(false)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
