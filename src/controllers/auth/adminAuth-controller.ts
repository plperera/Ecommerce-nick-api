import { Request, Response } from "express";
import httpStatus from "http-status";
import { signupSCHEMA } from "@/schemas/auth/signupSCHEMA";
import { signInSCHEMA } from "@/schemas/auth/signInSCHEMA";
import authAdminService from "@/services/auth/adminAuth-service";
import { AuthenticatedAdminRequest } from "@/middlewares/auth/authenticationAdmin-middlerare";

export async function adminSignUp(req: Request, res: Response){
    try {
        const isValid = signupSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { email, name, password, passwordVerify } = req.body

        await authAdminService.verifyUser({ email, name, password, passwordVerify })

        await authAdminService.createNewUser({ email, name, password })

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
export async function adminSignIn(req: Request, res: Response) {
    try {

        const isValid = signInSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { email, password } = req.body
        
        const { userAdminId } = await authAdminService.verifyAccees({ email, password })
        
        const token = await authAdminService.createSession( userAdminId )

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
          
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function adminLogout(req: AuthenticatedAdminRequest, res: Response) {
    try {
        
        const { userAdminId } = req
        
        await authAdminService.deleteSession(userAdminId)

        return res.sendStatus(httpStatus.OK)
        

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