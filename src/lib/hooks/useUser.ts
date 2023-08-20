import { UserModelSchemaType } from "@/schema/UserSchema"
import useSWRImmutable from "swr/immutable"
import { fetcher } from "../fetcher"

export const useUser = () =>
  useSWRImmutable("/api/user", async (url) => await fetcher<Omit<UserModelSchemaType, "password"> | null, undefined>(url))
