import { Router } from "express";
import { addDoctor, allDoctors, getDoctor } from "../controller/doctorController.js";

const doctorRoute= Router();

doctorRoute.post('/add-doctor',addDoctor);
doctorRoute.get('/doctors',allDoctors);
doctorRoute.post('/get-doctor',getDoctor);

export default doctorRoute;