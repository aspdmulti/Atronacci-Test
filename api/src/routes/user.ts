import express, { Router } from "express";
import { userController } from "../controllers/user";

export const route: Router = express.Router();
route.post("/", userController.register);
route.get("/social", userController.loginSocial);
