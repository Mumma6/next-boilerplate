import React from "react"
import { Alert, Box, Card, CardContent, CardHeader, Divider } from "@mui/material"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { useUser } from "@/lib/hooks/useUser"
import { fetcher } from "@/lib/fetcher"

const DeleteAccount = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { mutate } = useUser()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    const response = await fetcher("/api/user", {
      method: "DELETE",
      headers: {},
      data: null,
    })

    if (response.error) {
      setIsLoading(false)
      handleClose()
      toast.error(response.error)
    } else {
      setIsLoading(false)
      handleClose()
      mutate({ payload: null })
      toast.success(response.message)
      router.replace("/")
    }
  }

  return (
    <Card>
      <CardHeader subheader="Delete your account" title="Delete" />
      <Divider />
      <CardContent sx={{ minHeight: 242 }}>
        <Alert severity="error">This will delete your account permanently</Alert>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <div>
          <Button variant="contained" color="error" onClick={handleClickOpen}>
            Delete
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete your account?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">Deleted accounts can never be restored.</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button disabled={isLoading} color="info" onClick={handleClose}>
                Disagree
              </Button>
              <Button disabled={isLoading} color="error" onClick={handleDelete}>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </Card>
  )
}

export default DeleteAccount
