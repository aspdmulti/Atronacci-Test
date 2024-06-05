import express, { Router } from "express";
import { userController } from "../controllers/user";
import { verifyUser } from "../middlewares/auth-middleware";

export const route: Router = express.Router();
route.post("/", userController.register);
route.get("/v1", userController.keepLogin);
route.patch("/", verifyUser, userController.verifyEmail);
route.get("/social", userController.loginSocial);
