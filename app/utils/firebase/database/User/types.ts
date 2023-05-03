import { User as UserModel } from "../../../../models/User"

export type UserDataType = Omit<UserModel, "token" | "refreshToken">
