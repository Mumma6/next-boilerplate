import { UserModelSchemaType } from "../schema/UserSchema"
import { Db, WithId } from "mongodb"

declare module "next" {
  interface NextApiRequest {
    logIn: Function
    user?: WithId<Document>
    session?: any
    status: Function
  }
}

declare global {
  namespace Express {
    interface User extends UserModelSchemaType {}
  }
}
