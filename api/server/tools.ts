import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, `my-secret`, {
    expiresIn: "5s",
  });
};

export const generateRefreshToken = (payload: any) => {
  return jwt.sign(payload, `my-secret`, { expiresIn: "30d" });
};
