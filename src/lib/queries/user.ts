import bcrypt from "bcryptjs"
import { Db, ObjectId } from "mongodb"
import { UserModelSchema, type UserModelSchemaType } from "../../schema/UserSchema"

export const findUserForAuth = async (db: Db, userId: string) => {
  const user = await db.collection("users").findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } })
  return user
}

export const findUserById = async (db: Db, userId: string) =>
  await db
    .collection("users")
    .findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } })
    .then((user) => user || null)

export const findUserWithEmailAndPassword = async (db: Db, email: string, password: string) => {
  const user = await db.collection("users").findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    return { ...user }
  }
  return null
}

export const findUserByEmail = async (db: Db, email: string) =>
  await db
    .collection("users")
    .findOne({ email })
    .then((user) => user || null)

export const insertUser = async (db: Db, data: Pick<UserModelSchemaType, "email" | "password" | "name">) => {
  const parsedData = UserModelSchema.omit({ name: true, email: true, password: true, _id: true }).safeParse(data)

  if (!parsedData.success) {
    return null
  }

  const { email, password, name } = data
  const user = {
    ...parsedData.data,
    email,
    password,
    name,
  }
  const hashedPassword = await bcrypt.hash(user.password, 10)

  const insert = await db.collection("users").insertOne({ ...user, password: hashedPassword })

  const userOutput = await db.collection("users").findOne({ _id: insert.insertedId })

  return userOutput
}

export const updateUserPasswordByOldPassword = async (db: Db, id: ObjectId, oldPassword: string, newPassword: string) => {
  const user = await db.collection("users").findOne(new ObjectId(id))
  if (!user) {
    return false
  }

  const matched = await bcrypt.compare(oldPassword, user.password)

  if (!matched) {
    return false
  }

  const password = await bcrypt.hash(newPassword, 10)

  await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: { password } })
  return true
}

export const resetUserPassword = async (db: Db, id: string, newPassword: string) => {
  const password = await bcrypt.hash(newPassword, 10)
  await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: { password } })
}

export const deleteUser = async (db: Db, id: ObjectId) => {
  await db.collection("users").deleteOne({ _id: new ObjectId(id) })
}

export const updateUserById = async (db: Db, id: ObjectId, data: Partial<UserModelSchemaType>) => {
  const updatedUser = await db
    .collection("users")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data }, { returnDocument: "after", projection: { password: 0 } })
  return updatedUser.value
}
