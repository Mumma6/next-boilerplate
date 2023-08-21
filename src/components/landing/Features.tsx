import React from "react"
import { Box, Container, Grid } from "@mui/material"

import featureImage1 from "../../../public/assets/images/feature-1.png"
import featureImage2 from "../../../public/assets/images/feature-2.png"
import featureImage3 from "../../../public/assets/images/feature-3.png"
import featureImage4 from "../../../public/assets/images/feature-4.png"
import featureImage5 from "../../../public/assets/images/feature-5.png"
import featureImage6 from "../../../public/assets/images/feature-6.png"
import featureImage7 from "../../../public/assets/images/feature-7.png"
import featureImage8 from "../../../public/assets/images/feature-8.png"
import featureImage9 from "../../../public/assets/images/feature-9.png"
import FeaturesCard from "./FeaturesCard"

const TECHNOLOGIES_DATA = [
  {
    image: featureImage1,
    text: "Initiate your modern web applications with Next.js, the React framework that includes everything you need for efficient, scalable development.",
    heading: "Next.js",
  },
  {
    image: featureImage5,
    text: "Style your components effortlessly with Emotion, a highly flexible and speedy CSS-in-JS library.",
    heading: "Emotion",
  },
  {
    image: featureImage3,
    text: "Handle forms like a pro with Formik, and ensure robust validation with Zod. Together, they streamline form creation and validation.",
    heading: "Formik & Zod",
  },
  {
    image: featureImage4,
    text: "Manage data fetching in a breeze with SWR. It's a React Hooks library for remote data fetching, making client-side rendering simple and efficient.",
    heading: "SWR",
  },
  {
    image: featureImage2,
    text: "Implement secure authentication and persistence using Passport",
    heading: "Passport",
  },
  {
    image: featureImage6,
    text: "Create an elegant and responsive user interface with Material-UI, a popular React UI framework that follows Google's Material Design guidelines.",
    heading: "Material-UI",
  },
  {
    image: featureImage8,
    text: "Connect your application to a scalable and fully-managed cloud database feature with MongoDB Atlas, suitable for various application data needs.",
    heading: "MongoDB Atlas",
  },
  {
    image: featureImage7,
    text: "Ensure the quality of your application through end-to-end testing with Cypress, an all-in-one testing framework designed to be simple and efficient.",
    heading: "Cypress",
  },
  {
    image: featureImage9,
    text: "Host and deploy your application with Vercel.",
    heading: "Vercel",
  },
]

const Features = () => {
  return (
    <Box mt={20} mb={20} pt={10} pb={20} style={{ backgroundColor: "#ededed" }}>
      <Container>
        <Box
          sx={{
            textAlign: "center",
            mb: 15,
          }}
        >
          <p
            style={{
              color: "#0F2137",
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: 30,
            }}
          >
            Features overview
          </p>
        </Box>
        <Grid mb={4} mt={2} container spacing={2}>
          {TECHNOLOGIES_DATA.map((feature, index) => (
            <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
              <FeaturesCard image={feature.image} text={feature.text} heading={feature.heading} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Features
