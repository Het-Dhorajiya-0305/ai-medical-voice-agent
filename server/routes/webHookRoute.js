import express from "express";
import { stripeWebhook } from "../controller/userController.js";

const webhookRoutes = express.Router();

webhookRoutes.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default webhookRoutes;