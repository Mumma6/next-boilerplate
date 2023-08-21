import React from "react"
import Head from "next/head"
import EmailVerify from "../auth/EmailVerify"
import ChangePassword from "./ChangePassword"
import { Box, Container, Grid } from "@mui/material"
import DeleteAccount from "./DeleteAccount"
import { useUser } from "@/lib/hooks/useUser"

const Settings = () => {
  const { data } = useUser()

  return (
    <>
      <Head>
        <title>{`Settings | ${data?.payload?.name}`}</title>
      </Head>
      <Box
        component="main"
        sx={{
          marginTop: 5,
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <EmailVerify user={data?.payload!} />
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <Box sx={{ pt: 3 }}>
                <ChangePassword />
              </Box>
            </Grid>
            <Grid item sm={6}>
              <Box sx={{ pt: 3 }}>
                <DeleteAccount />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Settings
