import nextConnect from "next-connect"
import auths from "../../../lib/middlewares/auth"
import { getMongoDb } from "../../../lib/mongodb"
//import { deleteUser, updateUserById } from "../../../lib/queries/user"
import { type NextApiRequest, type NextApiResponse } from "next"

import { type Response } from "../../../types/response"
import { handleAPIError, handleAPIResponse } from "../../../lib/utils"

import { UserModelSchema, type UserModelSchemaType } from "../../../schema/UserSchema"
import { deleteUser, updateUserById } from "@/lib/queries/user"

const handler = nextConnect<NextApiRequest, NextApiResponse<Response<Omit<UserModelSchemaType, "password"> | null>>>()

handler.use(...auths)

handler.get(async (req, res) => {
  const parsedData = UserModelSchema.omit({ password: true }).safeParse(req.user)

  if (!parsedData.success) {
    return handleAPIError(res, "Error getting user")
  }
  !parsedData.data ? handleAPIResponse(res, null, "No user found") : handleAPIResponse(res, parsedData.data, "User found")
})

handler.delete(async (req, res) => {
  if (!req.user) {
    handleAPIResponse(res, null, "No user found")
    return
  }

  try {
    const db = await getMongoDb()
    await deleteUser(db, req.user?._id)
    await req.session.destroy()
    handleAPIResponse(res, null, "User deleted")
  } catch (error) {
    console.log(error)
    handleAPIError(res, "Error when deleting user")
  }
})

handler.patch(async (req, res) => {
  if (!req.user) {
    handleAPIResponse(res, null, "No user found")
    return
  }

  try {
    const db = await getMongoDb()

    const parsedBody = UserModelSchema.partial().safeParse(req.body)

    if (!parsedBody.success) {
      handleAPIError(res, "Validation error. User input")
      return
    }

    const user = await updateUserById(db, req.user?._id, parsedBody.data)

    const parsedUser = UserModelSchema.omit({ password: true }).safeParse(user)

    if (!parsedUser.success) {
      handleAPIError(res, "Validation error when updating user")
      return
    }

    handleAPIResponse(res, parsedUser.data, "User updated successfully")
  } catch (error) {
    console.log(error)
    handleAPIError(res, "Error when updating user")
  }
})

export default handler
