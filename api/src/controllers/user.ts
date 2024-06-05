/** @format */
import { Response, Request, NextFunction } from "express";
import { prisma, secretKey } from "..";
import { Membership, Prisma } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { mailer } from "../lib/nodemailer";
import mustache from "mustache";
import fs from "fs";
import { ReqUser } from "../middlewares/auth-middleware";

type TUser = {
  email: string;
};
const verification = fs
  .readFileSync(__dirname + "/../templates/verify.html")
  .toString();

export const userController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;
      const salt = await genSalt(10);

      const hashedPassword = await hash(password, salt);

      const newUser: Prisma.UserCreateInput = {
        email,
        password: hashedPassword,
        name,
        membership: "free",
      };

      const checkUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (checkUser?.id) throw Error("user already exist");

      await prisma.user.create({
        data: newUser,
      });

      const token = sign({ email }, secretKey, {
        expiresIn: "8hr",
      });

      const rendered = mustache.render(verification, {
        email,
        name,
        verify_url: process.env.verifyURL + token,
      });

      mailer({
        to: email,
        subject: "Verify Account",
        text: "",
        html: rendered,
      });

      res.send({
        success: true,
        message: "register success, please verify your account",
      });
    } catch (error) {
      next(error);
    }
  },
  async loginSocial(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name } = req.query;
      const user = await prisma.user.findUnique({
        where: { email: String(email) },
      });
      if (user?.id) {
        if (user?.isVerified == false) {
          await prisma.user.update({
            data: { isVerified: true },
            where: { email: String(email) },
          });
        }
        const resUser = {
          email: user.email,
          name: user.name,
          membership: user.membership,
        };
        const token = sign(resUser, secretKey, {
          expiresIn: "8hr",
        });
        return res.send({
          success: true,
          result: resUser,
          token,
        });
      } else {
        const newUser: Prisma.UserCreateInput = {
          email: String(email),
          name: String(name),
          isVerified: true,
        };
        await prisma.user.create({
          data: newUser,
        });
        const resUser = {
          email,
          name,
          membership: "free",
        };
        const token = sign(resUser, secretKey, {
          expiresIn: "8hr",
        });
        return res.send({
          success: true,
          result: resUser,
          token,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) throw Error("unauthorized");

      const verifyUser = verify(authorization, secretKey) as TUser;
      const checkUser = await prisma.user.findUnique({
        select: {
          email: true,
          name: true,
          membership: true,
        },
        where: {
          email: verifyUser.email,
        },
      });
      if (!checkUser) throw Error("unauthorized");

      const token = sign(checkUser, secretKey, {
        expiresIn: "8hr",
      });
      res.send({
        success: true,
        result: checkUser,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
  async verifyEmail(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { user } = req;
      if (!user) throw Error("user not found");
      if (user.isVerified) throw Error("user already verified");
      const verif: Prisma.UserUpdateInput = {
        isVerified: true,
      };
      await prisma.user.update({
        data: verif,
        where: {
          email: user?.email,
        },
      });
      res.send({
        message: "email verified",
      });
    } catch (error) {
      next(error);
    }
  },
};
