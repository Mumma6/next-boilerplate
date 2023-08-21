import { type NextApiRequest, type NextApiResponse } from "next"
import nextConnect from "next-connect"
import { CONFIG as MAIL_CONFIG, sendMail } from "../../../../lib/mail"
import { getMongoDb } from "../../../../lib/mongodb"
import { createToken } from "../../../../lib/queries/token"
import { findUserById } from "../../../../lib/queries/user"
import { handleAPIError, handleAPIResponse } from "../../../../lib/utils"
import { type Response } from "../../../../types/response"

const handler = nextConnect<NextApiRequest, NextApiResponse<Response<null>>>()

handler.post(async (req, res) => {
  const db = await getMongoDb()

  try {
    const user = await findUserById(db, req.body.userId)
    if (!user) {
      return handleAPIResponse(res, null, "No user found. Please try again.", 404)
    }

    const token = await createToken(db, {
      creatorId: user._id,
      type: "emailVerify",
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    })

    await sendMail({
      to: user.email,
      from: MAIL_CONFIG.from,
      subject: `Verification Email for ${process.env.WEB_URI}`,
      html: `
      <div>
        <p>Hello, ${user.name}</p>
        <p>Please follow <a href="${process.env.WEB_URI}/verify-email/${token.securedTokenId}">this link</a> to confirm your email.</p>
      </div>
      `,
    })

    handleAPIResponse(res, null, "Email has been sent")
  } catch (error) {
    console.log(error)
    handleAPIError(res, "Error when verifying email")
  }
})

export default handler
