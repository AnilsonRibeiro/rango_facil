import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const FoodOptionModel = types
  .model("FoodOption")
  .props({
    id: types.identifier,
    name: types.string,
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface FoodOption extends Instance<typeof FoodOptionModel> {}
export interface FoodOptionSnapshotOut extends SnapshotOut<typeof FoodOptionModel> {}
export interface FoodOptionSnapshotIn extends SnapshotIn<typeof FoodOptionModel> {}
export const createFoodOptionDefaultModel = () => types.optional(FoodOptionModel, {})
