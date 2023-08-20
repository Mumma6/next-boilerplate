import React from "react"
import Head from "next/head"
import Login from "@/components/auth/Login"

const loginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Login />
    </>
  )
}

export default loginPage
