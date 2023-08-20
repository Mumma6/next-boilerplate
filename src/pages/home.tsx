import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import Home from "@/components/dashboard/Home"
import { useUser } from "@/lib/hooks/useUser"
import { Container, CircularProgress } from "@mui/material"
import Head from "next/head"
import React from "react"

const HomePage = () => {
  const { data } = useUser()

  if (!data?.payload) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <>
      <DashboardLayout>
        <Head>
          <title>{`Dashboard | ${data?.payload?.name}`}</title>
        </Head>
        <Home user={data?.payload} />
      </DashboardLayout>
    </>
  )
}

export default HomePage
