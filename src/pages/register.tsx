import React from "react"
import Head from "next/head"
import Register from "@/components/auth/Register"

const registerPage = () => {
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <Register />
    </>
  )
}

export default registerPage
