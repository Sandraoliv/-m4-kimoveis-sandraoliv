import { NextFunction, Request, Response } from 'express'
import jwt from "jsonwebtoken";
import { AppError } from '../errors';

 export const ensureTokenIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }
  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }
    res.locals.id = Number(decoded.sub);
    res.locals.admin=decoded.admin;
  });

  return next();
};
      