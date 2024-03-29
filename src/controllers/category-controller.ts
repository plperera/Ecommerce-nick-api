import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares/auth/authentication-middlerare";
import { AuthenticatedAdminRequest } from "@/middlewares/auth/authenticationAdmin-middlerare";
import categoryService from "@/services/category-service";
import { newCategorySCHEMA } from "@/schemas/category/newCategorySCHEMA";
import { putCategorySCHEMA } from "@/schemas/category/putCategorySCHEMA";
import { disableCategorySCHEMA } from "@/schemas/category/disableCategorySCHEMA";
import { linkCategorySubCategorySCHEMA } from "@/schemas/category/linkSubCategoryCategorySCHEMA";
import subCategoryService from "@/services/subCategories-service";

export async function getAllCategories(req: AuthenticatedRequest, res: Response){
    try {        

        const getAllCategoriesData = await categoryService.getAllCategoriesData()

        return res.send(getAllCategoriesData).status(httpStatus.OK)
        

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
export async function getAllCategoriesData(req: AuthenticatedRequest, res: Response){
    try {        

        const allCategoriesAdminData = await categoryService.getAllCategoriesAdminData()

        return res.send(allCategoriesAdminData).status(httpStatus.OK)
        

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
export async function createCategory(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const isValid = newCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { categoryName } = req.body

        await categoryService.verifyName(categoryName)

        await categoryService.createCategory({ categoryName })

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

        const { categoryName, categoryId } = req.body

        await categoryService.verifyValidId(categoryId)
        await categoryService.verifyNameBelongsId({categoryName, categoryId})

        await categoryService.putCategory({ categoryName, categoryId })

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

        const { categoryId } = req.body

        await categoryService.verifyValidId(categoryId)

        await categoryService.disableCategory(categoryId)

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
export async function handleSubCategoryLink(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const isValid = linkCategorySubCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }   

        const { subCategoryId, categoryId } = req.body

        await subCategoryService.verifySubCategoryId(subCategoryId)
        await categoryService.verifyValidId(categoryId)

        const hasLink = await categoryService.verifyLink({ subCategoryId, categoryId })

        if (hasLink) {
            await categoryService.handleUnLinkSubCategory({ linkId: hasLink?.id })
        } else {
            await categoryService.clearSubCategoryLink(subCategoryId)
            await categoryService.handleLinkSubCategory({ subCategoryId, categoryId })
        }

        return res.sendStatus(httpStatus.OK)
        

    } catch (error) {
        if(error.name === "AcceptedError") {
            return res.sendStatus(httpStatus.ACCEPTED);
        }
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