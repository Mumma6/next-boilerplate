import nextConnect from "next-connect"
import auths from "../../../../lib/middlewares/auth"
import { type NextApiRequest, type NextApiResponse } from "next"
import { getMongoDb } from "../../../../lib/mongodb"
import { updateUserPasswordByOldPassword } from "../../../../lib/queries/user"
import { type Response } from "../../../../types/response"
import { handleAPIError, handleAPIResponse } from "../../../../lib/utils"

const handler = nextConnect<NextApiRequest, NextApiResponse<Response<null>>>()

handler.use(...auths)

handler.put(async (req, res) => {
  if (!req.user) {
    handleAPIResponse(res, null, "User auth", 401)
    return
  }

  try {
    const db = await getMongoDb()

    const { oldPassword, newPassword } = req.body

    const success = await updateUserPasswordByOldPassword(db, req.user._id, oldPassword, newPassword)

    if (!success) {
      handleAPIResponse(res, null, "The old password you entered is incorrect.", 401)
      return
    }

    handleAPIResponse(res, null, "Password updated")
  } catch (error) {
    console.log(error)
    handleAPIError(res, "Error when changing password")
  }
})

export default handler
