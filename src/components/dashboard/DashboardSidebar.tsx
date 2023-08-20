import React, { type ReactElement } from "react"
import { Box, Button, Divider, Drawer, IconButton, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import HomeIcon from "@mui/icons-material/Home"
import PersonIcon from "@mui/icons-material/Person"
import SettingsIcon from "@mui/icons-material/Settings"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import NavItem from "./NavItem"
import Link from "next/link"
import { type UserModelSchemaType } from "../../schema/UserSchema"

interface SidbarNavItems {
  href: string
  icon: ReactElement<any, any>
  title: string
}

const items: SidbarNavItems[] = [
  {
    href: "/home",
    icon: <HomeIcon fontSize="small" />,
    title: "Home",
  },

  {
    href: "/profile",
    icon: <PersonIcon fontSize="small" />,
    title: "Profile",
  },
  {
    href: "/settings",
    icon: <SettingsIcon fontSize="small" />,
    title: "Settings",
  },
]

interface IProps {
  open: boolean
  onClose: () => void
}

const DashboardSidebar = ({ open, onClose }: IProps) => {
  const theme = useTheme()
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"))

  const content = (
    <>
      <Box>
        {!lgUp && (
          <IconButton
            onClick={onClose}
            sx={{
              color: "white",
              float: "right",
              marginTop: 1.5,
            }}
          >
            <MenuOpenIcon />
          </IconButton>
        )}
      </Box>

      <Box sx={{ margin: 2 }}>
        <Link style={{ textDecoration: "none" }} href="/" passHref>
          <Button size="large" color="primary" variant="contained">
            Next boilerplate
          </Button>
        </Link>
      </Box>

      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
      </Box>
    </>
  )

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "#ededed",
            background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25,25))",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    )
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#ededed",
          background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25,25))",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  )
}

export default DashboardSidebar
