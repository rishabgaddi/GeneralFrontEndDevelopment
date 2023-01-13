import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import userModel from "~/models/userModel";

export const isAuth = async (request: any, response: Response, next: any) => {
  const token = request.headers.authorization.split(" ")[1];
  if (!token) {
    return response.status(401).send("Access denied.");
  }
  try {
    const decoded = <any>jwt.verify(token, `my-secret`);
    const user = await userModel.findOne({ email: decoded.user.email });
    if (!user) {
      return response.status(400).send("Invalid token.");
    }
    request.user = user;
    next();
  } catch (error) {
    return response.status(400).send("Invalid token.");
  }
};
