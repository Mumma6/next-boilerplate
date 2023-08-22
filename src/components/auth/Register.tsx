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
import { fetcher } from "@/lib/fetcher"
import { useUser } from "@/lib/hooks/useUser"

const initialValues = {
  name: "",
  email: "",
  password: "",
}

const Register = () => {
  const [status, setStatus] = useState<Status>("idle")

  const { data, mutate } = useUser()

  const router = useRouter()

  useEffect(() => {
    if (data?.payload) {
      router.replace("/home")
    }
  }, [data?.payload, router])

  const registerUser = async (data: UserRegistrationSchemaType) => {
    setStatus("loading")

    const responseData = await fetcher<UserModelSchemaType, UserRegistrationSchemaType>("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data,
    })

    if (responseData.error) {
      toast.error(responseData.error)
      setStatus("error")
      formik.resetForm()
    } else {
      mutate({ payload: responseData.payload }, false)
      toast.success("Your account has been created")
      setStatus("success")
      router.replace("/home")
    }
  }

  const formik = useFormik({
    initialValues,
    validate: toFormikValidate(UserRegistrationSchema),
    onSubmit: (formValues) => {
      registerUser(formValues)
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
            <Button disabled={status === "loading"} startIcon={<ArrowBackIcon />}>
              Home
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 1,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                Use your email to create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              type="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            ></Box>

            <Box sx={{ py: 2 }}>
              <SubmitButton
                text="Sign up Now"
                isLoading={status === "loading" || status === "success"}
                isDisabled={!formik.isValid || status === "loading" || status === "success"}
              />
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

export default Register
