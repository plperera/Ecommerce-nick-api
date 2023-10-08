import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares/auth/authentication-middlerare";
import { AuthenticatedAdminRequest } from "@/middlewares/auth/authenticationAdmin-middlerare";
import subCategoryService from "@/services/subCategories-service";
import { newSubCategorySCHEMA } from "@/schemas/subCategories/newSubCategorySCHEMA";
import { putSubCategorySCHEMA } from "@/schemas/subCategories/putSubCategorySCHEMA";
import { disableSubCategorySCHEMA } from "@/schemas/subCategories/disableSubCategorySCHEMA";
import productService from "@/services/product-service";
import { linkProductSubCategorySCHEMA } from "@/schemas/subCategories/linkProductToSubCategorySCHEMA";

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

        const isValid = newSubCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { subCategoryName } = req.body

        await subCategoryService.verifySubCategoryName({subCategoryName, mustHave: false})

        await subCategoryService.createSubCategory(subCategoryName)

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
export async function putSubCategory(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const isValid = putSubCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { subCategoryId } = req.body
        const newSubCategoryName = req.body.subCategoryName

        await subCategoryService.verifySubCategoryName({subCategoryName: newSubCategoryName, mustHave: false})
        await subCategoryService.verifySubCategoryId(subCategoryId)

        await subCategoryService.updateSubCategory({ subCategoryId, newSubCategoryName })

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
export async function handleStatusSubCategory(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const isValid = disableSubCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { subCategoryId } = req.body

        const {isActive} = await subCategoryService.verifySubCategoryId(subCategoryId)

        await subCategoryService.changeStatusSubCategory({ subCategoryId, newStatus: !isActive })

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
export async function handleProductLink(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const isValid = linkProductSubCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { subCategoryId, productId } = req.body

        await subCategoryService.verifySubCategoryId(subCategoryId)
        await productService.verifyProductId(productId)
        const hasLink = await subCategoryService.verifyLink({ subCategoryId, productId })

        if (hasLink) {
            await subCategoryService.handleUnLinkProduct({ linkId: hasLink?.id })
        } else {
            await subCategoryService.handleLinkProduct({ subCategoryId, productId })
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