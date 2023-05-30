import { signUpBody, signupSCHEMA } from "@/schemas/signupSCHEMA";
import { signInBody, signInSCHEMA } from "@/schemas/signInSCHEMA";
import authService from "@/services/auth-service";

import { Request, Response } from "express";
import httpStatus from "http-status";
import bcrypt from 'bcrypt';

export async function signUp(req: Request, res: Response){

    try {

        const isValid = signupSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { email, name, password, passwordVerify } = req.body

        await authService.verifyUser({ email, name, password, passwordVerify })
        await authService.createNewUser({ email, name, password })

        return res.sendStatus(httpStatus.CREATED)
        

    } catch (error) {
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        if (error.name === "ForbiddenError") {
            return res.status(httpStatus.FORBIDDEN).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function signIn(req: Request, res: Response) {
    try {

        const isValid = signInSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { email, password } = req.body
        
        const { userId } = await authService.verifyAccees({ email, password })
        
        const token = await authService.createSession( userId )

        return res.send({token: token}).status(httpStatus.OK)
        

    } catch (error) {

        if (error.name === "UnauthorizedError") {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
          }
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
          }
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === "ForbiddenError") {
            return res.sendStatus(httpStatus.FORBIDDEN);
        }
          
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

