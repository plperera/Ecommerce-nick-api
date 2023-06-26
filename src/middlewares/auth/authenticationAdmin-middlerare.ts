import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";

import { prisma } from "@/config";

export async function authenticateAdminToken(req: AuthenticatedAdminRequest, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");

  if (!authHeader){
    return res.sendStatus(httpStatus.UNAUTHORIZED)
  }
  
  const token = authHeader.split(" ")[1];

  if (!token){
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
  
  try {
    //const { userAdminId } = jwt.verify(token, process.env.JWT_SECRET) as RequestWithUserAdmin;

    const session = await prisma.sessionAdmin.findUnique({
      where: {
        token: token,
      },
    });

    if (!session){
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    req.userAdminId = session.userAdminId;

    return next();

  } catch (err) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export type AuthenticatedAdminRequest = Request & RequestWithUserAdmin;

type RequestWithUserAdmin = {
  userAdminId: number;
};
