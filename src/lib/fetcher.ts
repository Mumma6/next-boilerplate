import axios, { AxiosError, AxiosResponse, AxiosHeaders } from "axios"
import { Response } from "../types/response"

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

export interface Options<T> {
  method: HTTPMethod
  data: T
  headers: {}
}

const handleResponse = <R>(response: AxiosResponse<Response<R>>) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data
  } else {
    return { payload: null, error: "An error occurred while fetching data", message: "Error" }
  }
}

const handleError = <R>(error: AxiosError): Response<R> => {
  if (error.response && error.response.status === 401) {
    console.log(error)
    return { payload: null, error: "User not found", message: "Unauthorized" }
  } else {
    return { payload: null, error: error.message, message: "Error" }
  }
}

export const fetcher = async <R, T>(url: string, options?: Options<T>): Promise<Response<R>> =>
  await axios
    .request({ url, ...options })
    .then(handleResponse<R>)
    .catch(handleError<R>)
