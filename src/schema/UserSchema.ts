import { z } from "zod"
import { ObjectId } from "bson"

export const UserRegistrationSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string().min(1).max(100),
})

export const UserModelSchema = UserRegistrationSchema.extend({
  _id: z.custom<ObjectId>().transform((id) => id.toString()),
  about: z.string().min(1).max(2000).default(" "),
  emailVerified: z.boolean().default(false),
  createdAt: z.date().default(new Date()),
})

export type UserRegistrationSchemaType = z.infer<typeof UserRegistrationSchema>

export type UserModelSchemaType = z.infer<typeof UserModelSchema>
