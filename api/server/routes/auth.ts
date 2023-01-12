import express, { Request, Response } from "express";
import bcrypt from "bcrypt";

import userModel from "~/models/userModel";
import { isAuth } from "~/middlewares/auth";

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
            email: res.email,
            todos: res.todos,
          };
          request.session.user = user;
          return response.status(200).json(user);
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
  return response.status(200).json(request.session.user);
});

export default Router;

Router.get("/logout", async (request: any, response: Response) => {
  if (request.session && request.session.user) {
    await request.session.destroy();
    return response.status(200).json({ msg: "Successfully logged out." });
  }
  return response.status(200).json({ msg: "No user logged in." });
});
