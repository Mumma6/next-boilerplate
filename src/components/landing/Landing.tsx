import React from "react"
import Navbar from "./Navbar"
import Scroll from "react-scroll"
import Link from "next/link"
import { Box, Button, Container, Typography } from "@mui/material"
import Features from "./Features"

//  todo, update the links.

const Landing = () => {
  const Element = Scroll.Element
  return (
    <>
      <Navbar />
      <Container sx={{ paddingTop: 20 }}>
        <Box
          sx={{
            textAlign: "center",
            mb: 5,
          }}
        >
          <Typography sx={{ fontSize: 64 }}>
            Accelerate Your Development with this <span style={{ color: "#7c4dff" }}>Next.js</span> Boilerplate
          </Typography>
          <Box>
            <Box>
              <Typography sx={{ fontSize: 34, marginBottom: 5, marginTop: 10 }}>
                Ready to start your next project? Clone the repo or watch the tutorial to begin.
              </Typography>
              <Box>
                <Link style={{ textDecoration: "none", margin: 5 }} href="/sign-up" passHref>
                  <Button
                    sx={{
                      fontSize: 30,
                    }}
                    size="large"
                    color="secondary"
                    variant="contained"
                  >
                    Github Repo
                  </Button>
                </Link>
                <Link style={{ textDecoration: "none", margin: 5 }} href="/sign-up" passHref>
                  <Button
                    sx={{
                      fontSize: 30,
                    }}
                    size="large"
                    color="primary"
                    variant="contained"
                  >
                    Tutorial
                  </Button>
                </Link>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 34, marginTop: 10 }}>
                Crafted with industry-leading technologies, this boilerplate equips you with everything needed for efficient,
                modern web development.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
      <Element name="features">
        <Features />
      </Element>
    </>
  )
}

export default Landing
