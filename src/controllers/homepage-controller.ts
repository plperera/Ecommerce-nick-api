import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedAdminRequest } from "@/middlewares/auth/authenticationAdmin-middlerare";
import homePageService from "@/services/homepage-service";
import { newHomeBannerSCHEMA } from "@/schemas/homePage/newHomeBannerSCHEMA";
import { deleteHomeBannerSCHEMA } from "@/schemas/homePage/deleteHomeBannerSCHEMA";
import { putHomeBannerSCHEMA } from "@/schemas/homePage/putHomeBannerSCHEMA";
import { newHomeCategorySCHEMA } from "@/schemas/homePage/newHomeCategorySCHEMA";
import { deleteHomeCategorySCHEMA } from "@/schemas/homePage/deleteHomeCategorySCHEMA";
import { putHomeCategorySCHEMA } from "@/schemas/homePage/putHomeCategorySCHEMA";
import { newProductBannerSCHEMA } from "@/schemas/homePage/newProductBannerSCHEMA";
import { deleteProductBannerSCHEMA } from "@/schemas/homePage/deleteProductBannerSCHEMA";
import { putProductBannerSCHEMA } from "@/schemas/homePage/putProductBannerSCHEMA";

export async function getAllBanners(req: Request, res: Response){
    try {        

        const AllBanners = await homePageService.getAllIBannersData()

        return res.send(AllBanners.reverse()).status(httpStatus.OK)
        

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function getAllCategoriesHome(req: Request, res: Response){
    try {        

        const AllCategoriesHome = await homePageService.getAllCategoriesHomeData()

        return res.send(AllCategoriesHome.reverse()).status(httpStatus.OK)
        

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function getAllProductBanner(req: Request, res: Response){
    try {        

        const AllProductBanner = await homePageService.getAllProductBannerData()

        return res.send(AllProductBanner.reverse()).status(httpStatus.OK)
        

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function createNewBanner(req: AuthenticatedAdminRequest, res: Response){
    try {       
        
        const isValid = newHomeBannerSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        const { imageId, text } = req.body

        await homePageService.verifyImage(imageId)

        await homePageService.createBanner({ imageId, text })

        return res.sendStatus(httpStatus.CREATED)
        

    } catch (error) {
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function deleteBanner(req: AuthenticatedAdminRequest, res: Response){
    try {       
        
        const isValid = deleteHomeBannerSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { bannerId } = req.body

        await homePageService.verifyBannerId(bannerId)

        await homePageService.deleteBanner(bannerId)

        return res.sendStatus(httpStatus.OK)
        

    } catch (error) {
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function updateBanner(req: AuthenticatedAdminRequest, res: Response){
    try {       
        
        const isValid = putHomeBannerSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { bannerId, imageId, text } = req.body

        await homePageService.verifyBannerId(bannerId)
        await homePageService.verifyImage(imageId)

        await homePageService.updateBanner({ bannerId, imageId, text })

        return res.sendStatus(httpStatus.OK)
        

    } catch (error) {
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function createHomeCategory(req: AuthenticatedAdminRequest, res: Response){
    try {       
        
        const isValid = newHomeCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { imageId, subCategoryId } = req.body
 
        await homePageService.verifyImage(imageId)
        await homePageService.verifySubCategory(subCategoryId)

        await homePageService.createHomeCategory({ imageId, subCategoryId })

        return res.sendStatus(httpStatus.CREATED)
        

    } catch (error) {
        console.log(error?.message)
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function deleteHomeCategory(req: AuthenticatedAdminRequest, res: Response){
    try {       
        
        const isValid = deleteHomeCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        const { homeCategoryId } = req.body

        await homePageService.verifyHomeCategoryId(homeCategoryId)

        await homePageService.deleteHomeCategory(homeCategoryId)

        return res.sendStatus(httpStatus.OK)
        

    } catch (error) {
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function updateHomeCategory(req: AuthenticatedAdminRequest, res: Response){
    try {       
        
        const isValid = putHomeCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { homeCategoryId, imageId, subCategoryId, subTitle } = req.body

        await homePageService.verifyHomeCategoryId(homeCategoryId)
        await homePageService.verifyImage(imageId)
        await homePageService.verifySubCategory(subCategoryId)

        await homePageService.updateHomeCategory({ homeCategoryId, imageId, subCategoryId })

        return res.sendStatus(httpStatus.OK)
        

    } catch (error) {
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function createProductBanner(req: AuthenticatedAdminRequest, res: Response){
    try {       
        
        const isValid = newProductBannerSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { imageId, productId } = req.body
 
        await homePageService.verifyImage(imageId)
        await homePageService.verifyProductId(productId)

        await homePageService.createProductBanner({ imageId, productId })

        return res.sendStatus(httpStatus.CREATED)
        

    } catch (error) {
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function deleteProductBanner(req: AuthenticatedAdminRequest, res: Response){
    try {       
        
        const isValid = deleteProductBannerSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        const { productBannerId } = req.body

        await homePageService.verifyProductBannerId(productBannerId)

        await homePageService.deleteProductBanner(productBannerId)

        return res.sendStatus(httpStatus.OK)
        

    } catch (error) {
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        console.log(error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function updateProductBanner(req: AuthenticatedAdminRequest, res: Response){
    try {       
        
        const isValid = putProductBannerSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { productBannerId, productId, imageId } = req.body

        await homePageService.verifyProductBannerId(productBannerId)
        await homePageService.verifyProductId(productId)
        await homePageService.verifyImage(imageId)

        await homePageService.updateProductBanner({ productBannerId, productId, imageId })

        return res.sendStatus(httpStatus.OK)
        

    } catch (error) {
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function getAllCategoryCardData(req: Request, res: Response){
    try {        

        const AllCategoriesHome = await homePageService.getAllCardCategoryData()

        return res.send(AllCategoriesHome.reverse()).status(httpStatus.OK)
        

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}