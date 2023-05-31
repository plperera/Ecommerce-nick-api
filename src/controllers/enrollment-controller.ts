import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares/authentication-middlerare";
import enrollmentService from "@/services/enrollment-service";
import { enrollmentSCHEMA } from "@/schemas/enrollment/createEnrollmentSCHEMA";


export async function getEnrollment(req: AuthenticatedRequest, res: Response){
    try {        
        const { userId } = req

        const enrollmentData = await enrollmentService.getEnrollmentByUserId( userId )

        return res.send(enrollmentData).status(httpStatus.OK)
        

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
export async function newEnrollment(req: AuthenticatedRequest, res: Response){
    try {        
        
        const isValid = enrollmentSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { userId } = req
        const { cpf, birthday, phone } = req.body

        await enrollmentService.createEnrollment({ cpf, birthday, phone, userId })

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
export async function putEnrollment(req: AuthenticatedRequest, res: Response){
    try {        
        
        const isValid = enrollmentSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { userId } = req
        const { cpf, birthday, phone } = req.body

        await enrollmentService.updateEnrollment({ cpf, birthday, phone, userId })

        return res.sendStatus(httpStatus.OK)
        

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