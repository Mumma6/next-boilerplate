import { type Db, type ObjectId } from "mongodb"
import { nanoid } from "nanoid"

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
