import { Request, Response } from "express";

export const isAuth = (request: any, response: Response, next: any) => {
  if (request.session && request.session.user) {
    next();
  } else {
    return response.status(503).json({ msg: "Unauthorized." });
  }
};
