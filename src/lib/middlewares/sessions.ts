import MongoStore from "connect-mongo"
import nextSession from "next-session"
import { promisifyStore } from "next-session/lib/compat"
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"
import { getMongoClient } from "../mongodb"

const mongoStore = MongoStore.create({
  clientPromise: getMongoClient(),
  dbName: "dev",
  stringify: false,
})

const getSession = nextSession({
  store: promisifyStore(mongoStore),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 2 * 7 * 24 * 60 * 60, // 2 weeks,
    path: "/",
    sameSite: "strict",
  },
  touchAfter: 1 * 7 * 24 * 60 * 60, // 1 week
})

export default async function session(req: NextApiRequest, res: NextApiResponse, next: () => NextResponse) {
  await getSession(req, res)
  next()
}

/*
When a user logs in, Passport.js stores the user's identifier (the user's _id) in the session using the passport.serializeUser() function. This identifier is then sent to the client as a cookie.

When the user makes a subsequent request, the cookie is sent back to the server, and Passport.js uses the passport.deserializeUser() function to retrieve the full user object from the session data (by querying the MongoDB with the user's _id).

As long as the session cookie is still valid and present in the browser, Passport.js will be able to retrieve the user's information from the session, and the user will not have to log in again.

The session cookie, expires after a certain time, specified in your code as maxAge: 2 * 7 * 24 * 60 * 60 (2 weeks). If a user closes the browser and opens it again after the session cookie has expired, the user will have to log in again.
*/
