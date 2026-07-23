import { Router } from "express";
import express from "express"
import { checkAuth, googleLogin, loginUser, logoutUser, registerUser, updatePlan, upgradeSubscription, Userinfo } from "../controller/userController.js";
import passport from "passport";
import verifyUser from "../middleware/authUser.js";


const userRoute = Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.get('/logout', verifyUser, logoutUser);
userRoute.get('/auth', verifyUser, checkAuth);
userRoute.get('/info', verifyUser, Userinfo);
userRoute.post('/create-checkout-session', verifyUser, upgradeSubscription);
userRoute.post('/update-plan', verifyUser, updatePlan);

// google auth routes

userRoute.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

userRoute.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.FRONTEND_URL}/signin`,
    }),
    googleLogin
)
export default userRoute