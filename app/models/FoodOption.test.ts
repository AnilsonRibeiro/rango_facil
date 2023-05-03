import { FoodOptionModel } from "./FoodOption"

test("can be created", () => {
  const instance = FoodOptionModel.create({})

  expect(instance).toBeTruthy()
})
