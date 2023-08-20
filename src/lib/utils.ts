import { NextApiResponse } from "next"
import { Response } from "../types/response"

export const handleAPIResponse = <T>(
  res: NextApiResponse<Response<T>>,
  payload: T,
  message: string,
  statusCode = 200
): void => {
  res.statusCode = statusCode
  res.json({ payload, error: null, message })
}

export const handleAPIError = (res: NextApiResponse, error: string, statusCode = 400): void => {
  res.statusCode = statusCode
  res.json({ payload: null, error: error, message: "An error occurred" })
}
