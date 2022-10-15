import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

export const validateToken = (req: any, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "No token provided.",
      });
    }

    const decoded: any = jwt.verify(token, process.env.PRIVATE_JWT_KEY || "");

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized!",
      });
    }

    req.uid = decoded.uid;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token.",
    });
  }
};