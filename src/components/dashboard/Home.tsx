import { UserModelSchemaType } from "@/schema/UserSchema"
import React from "react"
import { Container, Paper } from "@mui/material"

interface IProps {
  user: Omit<UserModelSchemaType, "password">
}

const Home = ({ user }: IProps) => {
  return (
    <Paper
      sx={{
        flexGrow: 1,
        py: 5,
        marginTop: 10,
      }}
    >
      <Container maxWidth={false}>
        <h1>Welcome to your dashboard: {user.name}</h1>
      </Container>
    </Paper>
  )
}

export default Home
