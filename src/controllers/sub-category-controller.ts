import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares/auth/authentication-middlerare";
import { AuthenticatedAdminRequest } from "@/middlewares/auth/authenticationAdmin-middlerare";
import categoryService from "@/services/category-service";
import { newCategorySCHEMA } from "@/schemas/category/newCategorySCHEMA";
import { putCategorySCHEMA } from "@/schemas/category/putCategorySCHEMA";
import { disableCategorySCHEMA } from "@/schemas/category/disableCategorySCHEMA";
import subCategoryService from "@/services/subCategories-service";

export async function getAllSubCategoriesData(req: AuthenticatedRequest, res: Response){
    try {        
        
        const getAllSubCategoriesData = await subCategoryService.getAllSubCategoriesData()

        return res.send(getAllSubCategoriesData).status(httpStatus.OK)
        

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
export async function createSubCategory(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const isValid = newCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { name } = req.body

        await categoryService.verifyName(name)

        await categoryService.createCategory({ name })

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
export async function putCategory(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const isValid = putCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { name, id } = req.body

        await categoryService.verifyValidId(id)
        await categoryService.verifyNameBelongsId({id, name})

        await categoryService.putCategory({ name, id })

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
export async function disableCategory(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const isValid = disableCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { id } = req.body

        await categoryService.verifyValidId(id)

        await categoryService.disableCategory(id)

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