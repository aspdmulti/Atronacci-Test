/** @format */

import express, { Application, Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { routes } from "./routes";
import cors from "cors";
import { config } from "dotenv";
config();

export const prisma = new PrismaClient();

export const secretKey = String(process.env.secretKey);
const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/public/images",
  express.static(`${__dirname}/public/images/article_images`)
);
app.use(
  "/public/videos",
  express.static(`${__dirname}/public/videos/public_videos`)
);

const PORT = process.env.PORT;

app.use("/user", routes.userRoutes);
app.use("/article", routes.articleRoutes);
app.use("/video", routes.videoRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: error.message || "internal server error" });
});

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("page not found");
});

app.listen(PORT, () => {
  console.log("api is running on port", PORT);
});
