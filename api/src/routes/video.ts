import express, { Router } from "express";
import { verifyUser } from "../middlewares/auth-middleware";
import { videoController } from "../controllers/video";

export const route: Router = express.Router();
route.get("/page/:id", verifyUser, videoController.getVideo);
route.get("/:id", verifyUser, videoController.getVideoById);
