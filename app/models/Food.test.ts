import { FoodModel } from "./Food"

test("can be created", () => {
  const instance = FoodModel.create({})

  expect(instance).toBeTruthy()
})
