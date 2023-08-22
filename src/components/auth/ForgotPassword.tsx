import React, { type ChangeEvent, type FormEvent, useState } from "react"

import { toast } from "react-toastify"
import { type Status } from "../../types/status"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import NextLink from "next/link"
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import useRedirect from "@/customHooks/useRedirect"
import SubmitButton from "../common/SubmitButton"
import { fetcher } from "@/lib/fetcher"

const ForgotPassword = () => {
  const [status, setStatus] = useState<Status>("idle")
  const [email, setEmail] = useState("")

  const { activateTimer } = useRedirect("/login", 4)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const response = await fetcher("/api/user/password/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: email,
    })

    if (response.error) {
      setStatus("error")
      toast.error(response.error)
      setEmail("")
    } else {
      setStatus("success")
      setEmail("")
      activateTimer()
      toast.success(
        `An email has been sent to ${email}. Please follow the link to reset your password. Redirecting to login page`,
        {
          autoClose: 4000,
        }
      )
    }
  }

  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
        marginTop: 20,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={20}
          sx={{
            padding: 5,
          }}
        >
          <NextLink href="/login" passHref>
            <Button component="a" startIcon={<ArrowBackIcon />}>
              Sign in
            </Button>
          </NextLink>
          <form onSubmit={onSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Forgot password
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 1,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                Enter your email
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              name="email"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value)
              }}
              value={email}
              type="text"
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <SubmitButton text="Reset" isLoading={status === "loading"} isDisabled={status === "error"} />
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

export default ForgotPassword
