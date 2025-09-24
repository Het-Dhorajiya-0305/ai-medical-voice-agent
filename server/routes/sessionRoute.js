import { Router } from "express";
import { createSession, deleteSession, generateReport, getallsessions } from "../controller/sessionController.js";
import verifyUser from "../middleware/authUser.js";



const sessionRoute=Router();

sessionRoute.post('/create-session',verifyUser,createSession);
sessionRoute.post('/generate-session',generateReport)

sessionRoute.get('/delete',deleteSession)
sessionRoute.get('/getallsessions',verifyUser,getallsessions)



export default sessionRoute;