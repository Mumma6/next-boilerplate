import nodemailer from "nodemailer"
import { type MailOptions } from "nodemailer/lib/json-transport"

const config = {
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
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
  from: process.env.MAIL_USER,
}
