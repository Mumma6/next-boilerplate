import { type Db, type ObjectId } from "mongodb"
import { nanoid } from "nanoid"

type TokenTypes = "emailVerify" | "passwordReset"

export const createToken = async (
  db: Db,
  { creatorId, type, expireAt }: { creatorId: ObjectId; type: string; expireAt: Date }
) => {
  const securedTokenId = nanoid(24)
  const token = {
    securedTokenId,
    creatorId,
    type,
    expireAt,
  }

  await db.collection("tokens").insertOne(token)
  return token
}

export const findAndDeleteTokenByIdAndType = async (db: Db, id: string, type: TokenTypes) => {
  const { value } = await db.collection("tokens").findOneAndDelete({ securedTokenId: id, type })

  return value
}
