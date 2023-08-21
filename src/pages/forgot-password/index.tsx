import React from "react"
import ForgotPassword from "../../components/auth/ForgotPassword"
import Head from "next/head"

const ForgotPasswordPage = () => {
  return (
    <>
      <Head>
        <title>Forget password</title>
      </Head>
      <ForgotPassword />
    </>
  )
}

export default ForgotPasswordPage
