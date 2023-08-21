import nextConnect from "next-connect"
import auths from "../../../lib/middlewares/auth"
import passport from "../../../lib/passport"
import { NextApiRequest, NextApiResponse } from "next"
import { handleAPIResponse, handleAPIError } from "../../../lib/utils"
import { Response } from "../../../types/response"
import { UserModelSchema, UserModelSchemaType } from "../../../schema/UserSchema"

const handler = nextConnect<NextApiRequest, NextApiResponse<Response<UserModelSchemaType | null>>>()

handler.use(...auths)

handler.post(passport.authenticate("local"), (req, res) => {
  const parsedData = UserModelSchema.safeParse(req.user)

  if (!parsedData.success) {
    return handleAPIError(res, "Error login user")
  }

  return handleAPIResponse(res, parsedData.data, "User login")
})

handler.delete(async (req, res) => {
  await req.session.destroy()
  handleAPIResponse(res, null, "User logged out")
})

export default handler
