import passport from "../passport"
import session from "./sessions"

const auths = [session, passport.initialize(), passport.session()]

export default auths
