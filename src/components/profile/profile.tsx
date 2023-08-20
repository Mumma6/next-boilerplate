import React from "react"
import { Box, Container } from "@mui/material"
import About from "./about"

const Profile = () => {
  return (
    <>
      <Box
        component="main"
        sx={{
          marginTop: 5,
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <About />
        </Container>
      </Box>
    </>
  )
}

export default Profile
