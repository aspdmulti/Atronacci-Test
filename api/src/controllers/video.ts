import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { ReqUser } from "../middlewares/auth-middleware";

export const videoController = {
  async getVideo(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { user } = req;
      let take = 0;
      let skip = 0;
      let pageCount = 1;
      if (user?.membership == "free") {
        take = 3;
      } else if (user?.membership == "advanced") {
        take = 10;
      } else {
        take = 10;
        skip = (Number(req.params.id) - 1) * take;
        const count = await prisma.video.count();
        pageCount = Math.ceil(count / take);
      }
      const result = await prisma.video.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
      });
      return res.send({
        success: true,
        result,
        pageCount,
      });
    } catch (error) {
      next(error);
    }
  },
  async getVideoById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await prisma.video.findUnique({
        where: {
          id,
        },
      });
      return res.send({
        success: true,
        result,
      });
    } catch (error) {
      next(error);
    }
  },
};
