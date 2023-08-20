import React, { useState, MouseEvent } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import MenuIcon from "@mui/icons-material/Menu"

import { Link as ScrollLink } from "react-scroll"
import Link from "next/link"
import { useUser } from "@/lib/hooks/useUser"

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const pages = ["Features"]

  const { data } = useUser()

  return (
    <AppBar sx={{ backgroundColor: "white" }} position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              color: "black",
            }}
          >
            Title
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <ScrollLink key={page} smooth={true} to={page.toLowerCase()}>
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </ScrollLink>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,

              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Title
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <ScrollLink key={page} smooth={true} to={page.toLowerCase()}>
                <Button sx={{ my: 2, color: "black", display: "block" }}>{page}</Button>
              </ScrollLink>
            ))}
          </Box>

          {!data?.payload && (
            <Box>
              <Link style={{ textDecoration: "none" }} href="/register" passHref>
                <Button disabled={!data} size="large" color="secondary" variant="outlined">
                  Register
                </Button>
              </Link>
            </Box>
          )}
          <Box sx={{ marginLeft: 2 }}>
            {!data?.payload ? (
              <Link style={{ textDecoration: "none" }} href="/login" passHref>
                <Button disabled={!data} size="large" color="primary" variant="outlined">
                  Sign in
                </Button>
              </Link>
            ) : (
              <Link style={{ textDecoration: "none" }} href="/home" passHref>
                <Button size="large" color="primary" variant="contained">
                  Dashboard
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
