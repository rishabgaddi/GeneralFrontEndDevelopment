import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "~/models/userModel";
import { isAuth } from "~/middlewares/auth";
import { generateAccessToken, generateRefreshToken } from "~/tools";

const saltRounds = 10;

let Router = express.Router();

Router.post(
  "/register",
  async (request: Request, response: Response): Promise<Response> => {
    const { email, email_confirm, password, password_confirm } = request.body;
    let user;
    if (
      typeof email == "string" &&
      email != "" &&
      typeof password == "string" &&
      password != "" &&
      typeof email_confirm == "string" &&
      email_confirm != "" &&
      typeof password_confirm == "string" &&
      password_confirm != ""
    ) {
      if (email != email_confirm || password != password_confirm) {
        return response
          .status(500)
          .json({ msg: "Email or Password do not match." });
      }
      try {
        user = await userModel.create({
          email,
          password: bcrypt.hashSync(password, saltRounds),
        });
      } catch (error) {
        return response
          .status(500)
          .json({ msg: "Failed to register. " + error });
      }
    } else {
      return response
        .status(500)
        .json({ msg: "Email and Password are either missing or empty." });
    }

    return response.status(200).json("Successfully registered.\n" + user);
  }
);

Router.post("/login", async (request: any, response: Response) => {
  const { email, password } = request.body;

  if (
    typeof email == "string" &&
    email != "" &&
    typeof password == "string" &&
    password != ""
  ) {
    try {
      let res = await userModel.findOne({ email });
      if (res) {
        let success = await bcrypt.compareSync(password, res.password);
        if (success) {
          const user = {
            id: res._id,
            email: res.email,
            todos: res.todos,
          };

          const token = generateAccessToken({ user });
          const refreshToken = generateRefreshToken({ user });

          response.cookie("refreshtoken", refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
          });

          return response.status(200).json({ user, token });
        }
      }
      return response
        .status(500)
        .json({ msg: "Email or Password is incorrect." });
    } catch (err) {
      return response.status(500).json({ msg: "Failed to login. " + err });
    }
  }
  return response
    .status(500)
    .json({ msg: "Email and Password are either missing or empty." });
});

Router.get("/me", isAuth, async (request: any, response: Response) => {
  return response.status(200).json(request.user);
});

export default Router;

Router.get("/logout", async (request: any, response: Response) => {
  if (request.session) {
    await request.session.destroy();
  }
  return response.status(200).json({ msg: "Session closed." });
});

Router.get("/refresh-token", async (request: any, response: Response) => {
  try {
    const refreshToken = request.cookies.refreshtoken;
    if (!refreshToken) {
      return response.sendStatus(401);
    }

    const decoded = <any>jwt.verify(refreshToken, `my-secret`);
    if (!decoded) {
      return response.sendStatus(403);
    }

    const user = await userModel.findById({ _id: decoded.user.id });
    if (!user) {
      return response.sendStatus(403);
    }

    const token = generateAccessToken({ user });
    return response.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    return response.status(403).json(err);
  }
});
