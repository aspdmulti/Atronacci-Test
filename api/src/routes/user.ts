import express, { Router } from "express";
import { userController } from "../controllers/user";
import { verifyUser } from "../middlewares/auth-middleware";
import { userController2 } from "../controllers/user2";

export const route: Router = express.Router();
route.post("/", userController.register);
route.get("/", userController.login);
route.get("/v1", userController.keepLogin);
route.patch("/", verifyUser, userController.verifyEmail);
route.get("/social", userController.loginSocial);
route.patch("/v1", verifyUser, userController2.setMembership);
