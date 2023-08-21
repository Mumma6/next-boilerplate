import { type GetServerSideProps } from "next"
import Head from "next/head"
import { type ParsedUrlQuery } from "querystring"
import React from "react"
import { getMongoDb } from "../../lib/mongodb"
import { findAndDeleteTokenByIdAndType } from "@/lib/queries/token"
import ForgotPasswordToken from "@/components/auth/ForgotPasswordToken"

interface IParams extends ParsedUrlQuery {
  token: any
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const db = await getMongoDb()

  const { token } = context.params as IParams

  const tokenDoc = await findAndDeleteTokenByIdAndType(db, token, "passwordReset")

  return { props: { token, valid: !!tokenDoc, user: tokenDoc?.creatorId.toString() } }
}

const ResetPasswordTokenPage = ({ valid, token, user }: { valid: boolean; token: any; user: string }) => {
  return (
    <>
      <Head>
        <title>Forget password</title>
      </Head>
      <ForgotPasswordToken valid={valid} token={token} user={user} />
    </>
  )
}

export default ResetPasswordTokenPage
