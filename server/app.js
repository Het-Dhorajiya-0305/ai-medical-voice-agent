import express from "express";
import userRoute from "./routes/userRoutes.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import googleoauth from 'passport-google-oauth2'
import passport from "passport";
import session from "express-session";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

app.use(cors(
    {
        origin:  ['http://localhost:5173', 'http://127.0.0.1:5173'],
        credentials: true
    }
))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());


// google login
const googleStrategy = googleoauth.Strategy;
passport.use(new googleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback:true
},(request,accessToken,refreshToken,profile,done)=>{
    return done(null,profile)
}))

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))



app.use('/api/user', userRoute);
export default app;