import express, { Router } from "express";
import { verifyUser } from "../middlewares/auth-middleware";
import { articleController } from "../controllers/article";

export const route: Router = express.Router();
route.get("/page/:id", verifyUser, articleController.getArticle);
route.get("/:id", verifyUser, articleController.getArticleById);
