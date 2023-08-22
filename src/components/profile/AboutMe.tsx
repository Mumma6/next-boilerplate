import { useEffect, useState } from "react"
import { Box, Card, CardContent, CardHeader, Divider, TextField } from "@mui/material"
import { toast } from "react-toastify"
import { Status } from "@/types/status"
import { useFormik } from "formik"
import { toFormikValidate } from "zod-formik-adapter"

import SubmitButton from "../common/SubmitButton"
import { UserModelSchema, UserModelSchemaType } from "@/schema/UserSchema"
import { useUser } from "@/lib/hooks/useUser"
import { fetcher } from "@/lib/fetcher"

const initialValues = {
  about: "",
}

const AboutMe = () => {
  const [status, setStatus] = useState<Status>("idle")

  const { data, mutate } = useUser()

  const updateAboutUser = async (data: Pick<UserModelSchemaType, "about">) => {
    setStatus("loading")

    const responseData = await fetcher<UserModelSchemaType, Pick<UserModelSchemaType, "about">>("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data,
    })

    if (responseData.error) {
      toast.error(responseData.error)
      setStatus("error")
      formik.resetForm()
    } else {
      mutate({ payload: responseData.payload }, false)
      toast.success("Profile updated")
      setStatus("success")
    }
  }

  const formik = useFormik({
    initialValues,
    validate: toFormikValidate(UserModelSchema.pick({ about: true })),
    onSubmit: (formValues) => {
      updateAboutUser(formValues)
    },
  })

  useEffect(() => {
    if (data?.payload) {
      formik.setValues({
        about: data?.payload?.about || "",
      })
    }
  }, [data?.payload])

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardHeader subheader="Update your info and tell us a about yourself" title="Profile information" />
          <Divider />
          <CardContent>
            <TextField
              multiline
              rows={7}
              fullWidth
              label="About"
              margin="normal"
              name="about"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.about}
              type="text"
              variant="outlined"
              placeholder=""
              helperText={(formik.touched.about && formik.errors.about) || " "}
              error={Boolean(formik.touched.about && formik.errors.about)}
            />
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
              float: "right",
            }}
          >
            <SubmitButton
              customStyle={{ margin: 1 }}
              color="success"
              fullWidth={false}
              size={"medium"}
              text="Update information"
              isLoading={status === "loading"}
              isDisabled={!formik.isValid || status === "loading" || formik.values.about === data?.payload?.about}
            />
          </Box>
        </Card>
      </form>
    </>
  )
}

export default AboutMe
