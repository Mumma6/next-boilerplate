import React, { useCallback } from "react"
import { styled } from "@mui/material/styles"
import { AppBar, Box, Button, IconButton, Toolbar, Tooltip } from "@mui/material"

import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { useUser } from "@/lib/hooks/useUser"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import { fetcher } from "@/lib/fetcher"

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}))

interface IProps {
  onSidebarOpen: () => void
}

export const DashboardNavbar = ({ onSidebarOpen }: IProps) => {
  const { mutate } = useUser()

  const router = useRouter()

  const onSignOut = useCallback(async () => {
    const response = await fetcher("/api/auth", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      data: null,
    })

    if (response.error) {
      toast.error(response.error)
    }

    toast.success("You have been signed out")
    mutate({ payload: null })
    router.replace("/")
  }, [mutate, router])

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 270,
          },
          width: {
            lg: "calc(100% - 270px)",
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuOpenIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Sign out">
            <IconButton onClick={onSignOut} sx={{ ml: 1 }}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  )
}
