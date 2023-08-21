import nodemailer from "nodemailer"
import { type MailOptions } from "nodemailer/lib/json-transport"

const config = {
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "moarte6@gmail.com",
    pass: process.env.MAIL_PASS, // "xsmtpsib-bcad1da4261b32c81142a27bc3e2142493eb17286941dd88eef5ffcbc445cdc0-2kcx93ZyPDbj16Yg",
  },
}

const transporter = nodemailer.createTransport(config)

export async function sendMail({ from, to, subject, html }: MailOptions) {
  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    })
  } catch (e: any) {
    console.log(e)
    throw new Error(`Could not send email: ${e.message}`)
  }
}

export const CONFIG = {
  from: "moarte6@gmail.com",
}
