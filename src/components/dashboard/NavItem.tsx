import React from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { Box, Button } from "@mui/material"

interface IProps {
  href: string
  icon: any
  title: string
}

const NavItem = ({ href, icon, title }: IProps) => {
  const router = useRouter()

  const active = href ? router.pathname.includes(href) : false
  return (
    <div
      style={{
        padding: 10,
        paddingBottom: 1,
      }}
    >
      <NextLink style={{ textDecoration: "none" }} href={href} passHref>
        <Button
          startIcon={icon}
          disableRipple
          sx={{
            fontSize: 17,
            backgroundColor: active ? "primary.main" : undefined,
            color: "#ffffff",
            borderRadius: 1,
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "&:hover": {
              backgroundColor: "primary.light",
              color: "#ffffff",
            },
          }}
        >
          <Box sx={{ flexGrow: 1, marginLeft: 1 }}>{title}</Box>
        </Button>
      </NextLink>
    </div>
  )
}

export default NavItem
