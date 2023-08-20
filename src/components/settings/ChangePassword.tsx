import React, { type ChangeEvent, type FormEvent, useEffect, useState } from "react"

import { toast } from "react-toastify"
import { Alert, Box, Card, CardContent, CardHeader, Divider, TextField } from "@mui/material"
import { fetcher } from "@/lib/fetcher"
import SubmitButton from "../common/SubmitButton"

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  const [displayPasswordAlert, setDisplayPasswordAlert] = useState(false)
  const [displayPasswordAlertText, setDisplayPasswordAlertText] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (newPassword === "" || oldPassword === "" || confirmNewPassword === "") {
      setDisplayPasswordAlert(false)
      return
    }

    if (newPassword !== confirmNewPassword) {
      setDisplayPasswordAlertText("The new password doesn't match")
      setDisplayPasswordAlert(true)
    } else {
      setDisplayPasswordAlert(false)
    }

    if (oldPassword === newPassword && oldPassword === confirmNewPassword) {
      setDisplayPasswordAlertText("The new password cant be the same as the old")
      setDisplayPasswordAlert(true)
    }
  }, [confirmNewPassword, newPassword, oldPassword])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setIsLoading(true)
      const response = await fetcher("/api/user/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        data: {
          oldPassword,
          newPassword,
        },
      })

      if (response.error) {
        setIsLoading(false)
        toast.error(response.error)
        setOldPassword("")
        setNewPassword("")
        setConfirmNewPassword("")
      } else {
        setIsLoading(false)
        toast.success(response.message)
        setOldPassword("")
        setNewPassword("")
        setConfirmNewPassword("")
      }
    } catch (e: any) {
      console.log(e)
      toast.error(e.message)
    }
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader subheader="Update password" title="Password" />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Old password"
              margin="normal"
              name="old"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setOldPassword(event.target.value)
              }}
              type="password"
              value={oldPassword}
              variant="outlined"
              placeholder=""
            />
            <TextField
              fullWidth
              label="New password"
              margin="normal"
              name="new"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setNewPassword(event.target.value)
              }}
              value={newPassword}
              type="password"
              variant="outlined"
              placeholder=""
            />
            <TextField
              fullWidth
              label="Confirm password"
              margin="normal"
              name="confirm"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setConfirmNewPassword(event.target.value)
              }}
              value={confirmNewPassword}
              type="password"
              variant="outlined"
              placeholder=""
            />
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            {displayPasswordAlert ? <Alert severity="error">{displayPasswordAlertText}</Alert> : <div></div>}
            <SubmitButton
              customStyle={{ margin: 1 }}
              fullWidth={false}
              size={"medium"}
              text="Update"
              isLoading={isLoading}
              isDisabled={oldPassword === "" || newPassword === "" || confirmNewPassword === "" || displayPasswordAlert}
            />
          </Box>
        </Card>
      </form>
    </>
  )
}

export default ChangePassword
