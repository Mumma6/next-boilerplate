import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let indexesCreated = false
async function createIndexes(client: MongoClient) {
  if (indexesCreated) return client
  const db = client.db("dev")
  await Promise.all([db.collection("users").createIndexes([{ key: { email: 1 }, unique: true }])])
  indexesCreated = true
  return client
}

export async function getMongoClient() {
  /**
   * Global is used here to maintain a cached connection across hot reloads
   * in development. This prevents connections growing exponentiatlly
   * during API Route usage.
   * https://github.com/vercel/next.js/pull/17666
   */
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri)
    console.log("Connected to MongoDB")
    global._mongoClientPromise = client.connect().then(async (client) => await createIndexes(client))
  }
  console.log("Return MongoPromise")
  return await global._mongoClientPromise
}

export async function getMongoDb() {
  const mongoClient = await getMongoClient()
  return mongoClient.db("dev")
}
