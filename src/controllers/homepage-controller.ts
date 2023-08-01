import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedAdminRequest } from "@/middlewares/auth/authenticationAdmin-middlerare";
import imageService from "@/services/image-service";
import { AuthenticatedAdminRequestWithPublicURL } from "@/middlewares/image/uploadImage-middleware";
import { deleleImageSCHEMA } from "@/schemas/image/deleteImageSCHEMA";
import { format } from "date-fns";
import homePageService from "@/services/homepage-service";
import { newHomeBannerSCHEMA } from "@/schemas/homePage/newHomeBannerSCHEMA";
import { deleteHomeBannerSCHEMA } from "@/schemas/homePage/deleteHomeBannerSCHEMA";
import { putHomeBannerSCHEMA } from "@/schemas/homePage/putHomeBannerSCHEMA";
import { newHomeCategorySCHEMA } from "@/schemas/homePage/newHomeCategorySCHEMA";
import { deleteHomeCategorySCHEMA } from "@/schemas/homePage/deleteHomeCategorySCHEMA";
import { putHomeCategorySCHEMA } from "@/schemas/homePage/putHomeCategorySCHEMA";

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
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { subTitle, imageId, categoryId } = req.body
 
        await homePageService.verifyImage(imageId)
        await homePageService.verifyCategory(categoryId)

        await homePageService.createHomeCategory({ subTitle, imageId, categoryId })

        return res.sendStatus(httpStatus.CREATED)
        

    } catch (error) {
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
        
        const { homeCategoryId, imageId, categoryId, subTitle } = req.body

        await homePageService.verifyHomeCategoryId(homeCategoryId)
        await homePageService.verifyImage(imageId)
        await homePageService.verifyCategory(categoryId)

        await homePageService.updateHomeCategory({ homeCategoryId, imageId, categoryId, subTitle })

        return res.sendStatus(httpStatus.OK)
        

    } catch (error) {
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}