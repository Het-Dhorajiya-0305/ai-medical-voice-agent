import { Router } from "express";
import { googleLogin, loginUser, registerUser } from "../controller/userController.js";
import passport from "passport";


const userRoute = Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);

// google auth routes

userRoute.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

userRoute.get('/auth/google/callback', 
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:5173/login',
    }),
    googleLogin
)
export default userRoute