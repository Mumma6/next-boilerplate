export interface Response<R> {
  payload: R | null
  error: string | null
  message: string
}
