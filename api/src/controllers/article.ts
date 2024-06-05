import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { ReqUser } from "../middlewares/auth-middleware";

export const articleController = {
  async getArticle(req: ReqUser, res: Response, next: NextFunction) {
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
        const count = await prisma.article.count();
        pageCount = Math.ceil(count / take);
      }
      const result = await prisma.article.findMany({
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
  async getArticleById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await prisma.article.findUnique({
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
