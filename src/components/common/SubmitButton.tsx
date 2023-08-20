import React from "react"
import { Button, CircularProgress } from "@mui/material"

interface IProps {
  isLoading: boolean
  text: string
  isDisabled?: boolean
  fullWidth?: boolean
  size?: "large" | "small" | "medium" | undefined
  customStyle?: Object
  color?: "primary" | "inherit" | "secondary" | "success" | "error" | "info" | "warning" | undefined
  customOnClick?: Function
}

const SubmitButton = ({
  isLoading,
  text,
  isDisabled = false,
  fullWidth = true,
  size = "large",
  customStyle = {},
  color = "primary",
}: IProps) => {
  return isLoading ? (
    <Button
      style={customStyle}
      color={color}
      disabled={isDisabled}
      fullWidth={fullWidth}
      size={size}
      type="submit"
      variant="contained"
    >
      Loading...
      <CircularProgress style={{ marginRight: 5 }} size="sm" role="status" aria-hidden="true" />
    </Button>
  ) : (
    <Button
      style={customStyle}
      color={color}
      disabled={isDisabled}
      fullWidth={fullWidth}
      size={size}
      type="submit"
      variant="contained"
    >
      {text}
    </Button>
  )
}

export default SubmitButton
