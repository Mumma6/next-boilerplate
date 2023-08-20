import nextConnect from "next-connect"
import auths from "../../../lib/middlewares/auth"
import { getMongoDb } from "../../../lib/mongodb"

import { findUserByEmail, insertUser } from "../../../lib/queries/user"
import { type Response } from "../../../types/response"
import { type NextApiRequest, type NextApiResponse } from "next"
import { handleAPIError, handleAPIResponse } from "../../../lib/utils"
import { type UserModelSchemaType, UserRegistrationSchema, UserModelSchema } from "../../../schema/UserSchema"

const handler = nextConnect<NextApiRequest, NextApiResponse<Response<UserModelSchemaType | null>>>()

handler.post(...auths, async (req, res) => {
  const db = await getMongoDb()

  try {
    const parsedFormInput = UserRegistrationSchema.safeParse(req.body)

    if (!parsedFormInput.success) {
      return handleAPIError(res, "Validation error")
    }

    const { data } = parsedFormInput
    const { email, password, name } = data

    if (await findUserByEmail(db, email)) {
      return handleAPIError(res, "The email you entered is already in use.")
    }

    const user = await insertUser(db, {
      email,
      password,
      name,
    })

    const responseData = UserModelSchema.safeParse(user)

    req.logIn(user, (err: string) => {
      if (!responseData.success) {
        handleAPIError(res, err)
        return
      }

      if (err) {
        handleAPIError(res, err)
        return
      }

      handleAPIResponse(res, responseData.data, "User found")
    })
  } catch (error) {
    console.log(error)
    handleAPIError(res, "error when creating user")
  }
})

export default handler
