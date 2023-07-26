import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares/auth/authentication-middlerare";
import shippingService from "@/services/shipping-service";
import { AuthenticatedAdminRequest } from "@/middlewares/auth/authenticationAdmin-middlerare";
import { newShippingSCHEMA } from "@/schemas/shipping/newShippingSCHEMA";
import { putShippingSCHEMA } from "@/schemas/shipping/putShippingSCHEMA";
import { disableShippingSCHEMA } from "@/schemas/shipping/disableShippingSCHEMA";

export async function getAllShippingMethods(req: AuthenticatedRequest, res: Response){
    try {        

        const allShippingData = await shippingService.getAllShippingData()

        return res.send(allShippingData).status(httpStatus.OK)
        

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
export async function getAllShippingMethodsData(req: AuthenticatedRequest, res: Response){
    try {        

        const allShippingData = await shippingService.getAdminAllShippingData()

        return res.send(allShippingData).status(httpStatus.OK)
        

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
export async function createShippingMethod(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const isValid = newShippingSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { name, price } = req.body

        await shippingService.verifyName(name)

        await shippingService.create({ name, price: Number(price) })

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
        console.log(error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function putShippingMethod(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const isValid = putShippingSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { name, price, id } = req.body

        await shippingService.verifyValidIdForEnable(id)
        await shippingService.verifyNameBelongsId({id, name})

        await shippingService.putShipping({ name, price: Number(price), id })

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
export async function disableShippingMethod(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const isValid = disableShippingSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { id } = req.body

        await shippingService.verifyValidId(id)

        await shippingService.disableShipping(id)

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
export async function enableShippingMethod(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const isValid = disableShippingSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { id } = req.body

        await shippingService.verifyValidIdForEnable(id)

        await shippingService.enableShipping(id)

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
        console.log(error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}