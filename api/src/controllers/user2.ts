/** @format */
import { Response, Request, NextFunction } from "express";
import { prisma, secretKey } from "..";
import { Prisma } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { mailer } from "../lib/nodemailer";
import mustache from "mustache";
import fs from "fs";
import { ReqUser } from "../middlewares/auth-middleware";

type TUser = {
  email: string;
};
export const userController2 = {
  async setMembership(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { user } = req;
      const { membershipChange } = req.body;
      const setMembership: Prisma.UserUpdateInput = {
        membership: membershipChange,
      };
      await prisma.user.update({
        data: setMembership,
        where: { email: user?.email },
      });
      return res.send({
        success: true,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },
};
