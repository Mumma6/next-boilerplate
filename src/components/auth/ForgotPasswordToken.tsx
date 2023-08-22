import React, { type ChangeEvent, type FormEvent, useState } from "react"
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material"

import { toast } from "react-toastify"
import NextLink from "next/link"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

import { type Status } from "../../types/status"
import useRedirect from "@/customHooks/useRedirect"
import SubmitButton from "../common/SubmitButton"
import { fetcher } from "@/lib/fetcher"

const ForgotPasswordToken = ({ valid, token, user }: { valid: boolean; token: any; user: string }) => {
  const [status, setStatus] = useState<Status>("idle")
  const [newPassword, setNewPassword] = useState("")

  const { activateTimer } = useRedirect("/login", 4)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const response = await fetcher("/api/user/password/reset", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: {
        token,
        password: newPassword,
        user,
      },
    })

    if (response.error) {
      setStatus("error")
      toast.error(response.error)
      setNewPassword("")
    } else {
      setStatus("success")
      setNewPassword("")
      activateTimer()
      toast.success("Your password has been updated successfully. Redirecting to login page", {
        autoClose: 4000,
      })
    }
  }

  return (
    <>
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
        {!valid ? (
          <Container maxWidth="sm">
            <Paper
              elevation={20}
              sx={{
                padding: 5,
              }}
            >
              <Typography color="textPrimary" variant="h4">
                Invalid link
              </Typography>
              <Typography color="textPrimary" variant="h5">
                This is an invalid link. Please close this window and try again
              </Typography>
              <NextLink href="/login" passHref>
                <Button component="a" startIcon={<ArrowBackIcon />}>
                  Return to login
                </Button>
              </NextLink>
            </Paper>
          </Container>
        ) : (
          <Container maxWidth="sm">
            <Paper
              elevation={20}
              sx={{
                padding: 5,
              }}
            >
              <form onSubmit={onSubmit}>
                <Box sx={{ my: 3 }}>
                  <Typography color="textPrimary" variant="h4">
                    Reset password
                  </Typography>
                </Box>
                <Box
                  sx={{
                    pb: 1,
                    pt: 1,
                  }}
                >
                  <Typography align="center" color="textSecondary" variant="body1">
                    Enter a new password for your account
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Password"
                  margin="normal"
                  name="password"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setNewPassword(event.target.value)
                  }}
                  value={newPassword}
                  type="password"
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <SubmitButton text="Submit" isLoading={status === "loading"} isDisabled={status === "error"} />
                </Box>
              </form>
            </Paper>
          </Container>
        )}
      </Box>
    </>
  )
}

export default ForgotPasswordToken
