import { Router } from "express";
import { createSession, generateReport } from "../controller/sessionController.js";
import verifyUser from "../middleware/authUser.js";



const sessionRoute=Router();

sessionRoute.post('/create-session',verifyUser,createSession);
sessionRoute.post('/generate-session',verifyUser,generateReport);

export default sessionRoute;