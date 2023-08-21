import nextConnect from "next-connect"
import { handleAPIError, handleAPIResponse } from "../../../../lib/utils"
import { type NextApiRequest, type NextApiResponse } from "next"
import { type Response } from "../../../../types/response"
import { CONFIG as MAIL_CONFIG, sendMail } from "../../../../lib/mail"
import { getMongoDb } from "../../../../lib/mongodb"
import { createToken, findAndDeleteTokenByIdAndType } from "../../../../lib/queries/token"
import { resetUserPassword, findUserByEmail } from "../../../../lib/queries/user"

const handler = nextConnect<NextApiRequest, NextApiResponse<Response<null>>>()

handler.post(async (req, res) => {
  const db = await getMongoDb()

  const user = await findUserByEmail(db, req.body)
  if (!user) {
    return handleAPIResponse(res, null, "No user found. Please try again.", 404)
  }

  const token = await createToken(db, {
    creatorId: user._id,
    type: "passwordReset",
    expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  })

  await sendMail({
    to: req.body,
    from: MAIL_CONFIG.from,
    subject: "next-boilerplate: Reset your password.",
    html: `
      <div>
        <p>Hello, ${user.name}</p>
        <p>Please follow <a href="${process.env.WEB_URI}/forgot-password/${token.securedTokenId}">this link</a> to reset your password.</p>
      </div>
      `,
  })

  handleAPIResponse(res, null, "Email has been sent")
})

handler.put(async (req, res) => {
  const db = await getMongoDb()

  await resetUserPassword(db, req.body.user, req.body.password)

  handleAPIResponse(res, null, "Password has been updated")
})

export default handler
