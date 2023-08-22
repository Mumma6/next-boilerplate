import React from "react"
import { Box, Container } from "@mui/material"
import AboutMe from "./AboutMe"

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
          <AboutMe />
        </Container>
      </Box>
    </>
  )
}

export default Profile
