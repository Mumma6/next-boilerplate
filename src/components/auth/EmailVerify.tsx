import { Alert, Button } from "@mui/material"
import React, { type FormEvent, useState } from "react"
import { toast } from "react-toastify"
import { type UserModelSchemaType } from "../../schema/UserSchema"
import { type Status } from "../../types/status"
import { fetcher } from "@/lib/fetcher"

const EmailVerify = ({ user }: { user: Omit<UserModelSchemaType, "password"> }) => {
  const [status, setStatus] = useState<Status>("idle")

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const response = await fetcher("/api/user/email/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        userId: user._id,
      },
    })

    if (response.error) {
      setStatus("error")
      toast.error(response.error)
    } else {
      setStatus("success")
      toast.info("An email has been sent to your mailbox. Follow the instruction to verify your email.", {
        autoClose: 4000,
      })
    }
  }

  if (user.emailVerified) {
    return null
  }

  const note = status === "success" ? "An email has been sent to your inbox" : `Your email ${user.email} is not verified`
  return (
    <>
      <Alert
        severity="info"
        action={
          <Button
            disabled={status === "success" || status === "loading"}
            onClick={async (event) => {
              await onSubmit(event)
            }}
            variant="contained"
            sx={{ margin: 1 }}
          >
            Verify
          </Button>
        }
      >
        {`Note: ${note}`}
      </Alert>
    </>
  )
}

export default EmailVerify
