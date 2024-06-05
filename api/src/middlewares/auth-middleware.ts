/** @format */

import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { prisma, secretKey } from "..";
import { Prisma } from "@prisma/client";

export type TUser = {
  email: string;
  name: string;
  isVerified: boolean;
  membership: string;
};

export interface ReqUser extends Request {
  user?: TUser;
}

export const verifyUser = async (
  req: ReqUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw Error("unauthorized");

    const verifyToken = verify(String(token), secretKey) as TUser;

    const user = (await prisma.user.findUnique({
      where: {
        email: verifyToken?.email,
      },
    })) as TUser;
    if (!user.email) throw Error("not found");
    req.user = user as TUser;
    next();
  } catch (err) {
    next(err);
  }
};

export const verifyMembership = async (
  req: ReqUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    if (user?.membership !== "premium") throw Error("premuim user only");
    next();
  } catch (error) {
    next(error);
  }
};
