import { Router } from "express";
import { createSession } from "../controller/sessionController.js";
import verifyUser from "../middleware/authUser.js";



const sessionRoute=Router();

sessionRoute.post('/create-session',verifyUser,createSession);

export default sessionRoute;