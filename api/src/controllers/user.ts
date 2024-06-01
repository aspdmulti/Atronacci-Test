/** @format */
import { Response, Request, NextFunction } from "express";
import { prisma, secretKey } from "..";
import { Membership, Prisma } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { mailer } from "../lib/nodemailer";
import mustache from "mustache";
import fs from "fs";

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
          result: "none",
          token,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
