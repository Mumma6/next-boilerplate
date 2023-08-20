import { Box } from "@mui/material"
import React from "react"
import Image from "next/image"

interface IProps {
  image: any
  text: string
  heading: string
}

const FeaturesCard = ({ image, text, heading }: IProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        textAlign: "left",
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
        }}
      >
        <Image alt={heading} src={image} width={88} height={88} />
      </Box>
      <Box
        style={{
          marginLeft: 30,
        }}
      >
        <p
          style={{
            color: "#0F2137",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: 1,
          }}
        >
          {heading}
        </p>
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.87,
            color: "#343D48",
          }}
        >
          {text}
        </p>
      </Box>
    </Box>
  )
}

export default FeaturesCard
