import { type GetServerSideProps } from "next"
import Head from "next/head"
import { type ParsedUrlQuery } from "querystring"
import React from "react"
import EmailVerifyToken from "../../components/auth/EmailVerifyToken"
import { getMongoDb } from "../../lib/mongodb"
import { findAndDeleteTokenByIdAndType } from "../../lib/queries/token"
import { updateUserById } from "../../lib/queries/user"

interface IParams extends ParsedUrlQuery {
  token: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const db = await getMongoDb()

  const { token } = context.params as IParams

  const deletedToken = await findAndDeleteTokenByIdAndType(db, token, "emailVerify")

  if (!deletedToken) return { props: { valid: false } }

  await updateUserById(db, deletedToken.creatorId, {
    emailVerified: true,
  })

  return { props: { valid: true } }
}

const EmailVerifyPage = ({ valid }: { valid: boolean }) => {
  return (
    <>
      <Head>
        <title>Email verification</title>
      </Head>
      <EmailVerifyToken valid={valid} />
    </>
  )
}

export default EmailVerifyPage
