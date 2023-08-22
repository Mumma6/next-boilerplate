import { FormEvent, useEffect, useState } from "react"
import { Box, Button, Container, Link, Paper, TextField, Typography } from "@mui/material"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { Status } from "@/types/status"
import { useFormik } from "formik"
import { toFormikValidate } from "zod-formik-adapter"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

import SubmitButton from "../common/SubmitButton"
import { UserModelSchemaType, UserRegistrationSchema, UserRegistrationSchemaType } from "@/schema/UserSchema"
import { useUser } from "@/lib/hooks/useUser"
import { fetcher } from "@/lib/fetcher"

const initialValues = {
  name: "",
  email: "",
  password: "",
}

const Login = () => {
  const [status, setStatus] = useState<Status>("idle")

  const { data, mutate } = useUser()

  const router = useRouter()

  useEffect(() => {
    if (data?.payload) {
      router.replace("/home")
    }
  }, [data?.payload, router])

  const loginUser = async (data: Omit<UserRegistrationSchemaType, "name">) => {
    setStatus("loading")

    const responseData = await fetcher<UserModelSchemaType, Omit<UserRegistrationSchemaType, "name">>("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: data,
    })

    if (responseData.error) {
      toast.error(responseData.error)
      setStatus("error")
      formik.resetForm()
    } else {
      mutate({ payload: responseData.payload }, false)
      setStatus("success")
    }
  }

  const formik = useFormik({
    initialValues,
    validate: toFormikValidate(UserRegistrationSchema.omit({ name: true })),
    onSubmit: (formValues) => {
      loginUser(formValues)
    },
  })

  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
        marginTop: 20,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={20}
          sx={{
            padding: 5,
          }}
        >
          <NextLink href="/" passHref>
            <Button startIcon={<ArrowBackIcon />}>Home</Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 1,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                Login with your email address
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              variant="outlined"
              placeholder=""
              helperText={(formik.touched.email && formik.errors.email) || " "}
              error={Boolean(formik.touched.email && formik.errors.email)}
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <SubmitButton
                text="Sign in Now"
                isLoading={status === "loading" || status === "success"}
                isDisabled={!formik.isValid || status === "loading" || status === "success"}
              />
            </Box>
          </form>
          <NextLink href="/forgot-password" passHref>
            Forgot password
          </NextLink>
          <div style={{ display: "flex" }}>
            <Typography mt={1} mr={1} color="textSecondary" variant="body2">
              Don&apos;t have an account?
            </Typography>
            <NextLink href="/register">
              <Typography mt={1} color="textSecondary" variant="body2">
                Register
              </Typography>
            </NextLink>
          </div>
        </Paper>
      </Container>
    </Box>
  )
}

export default Login
