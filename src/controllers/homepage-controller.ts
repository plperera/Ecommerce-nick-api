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

export async function getAllBanners(req: Request, res: Response){
    try {        

        const AllBanners = await homePageService.getAllIBannersData()

        return res.send(AllBanners).status(httpStatus.OK)
        

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function getAllCategoriesHome(req: Request, res: Response){
    try {        

        const AllCategoriesHome = await homePageService.getAllCategoriesHomeData()

        return res.send(AllCategoriesHome).status(httpStatus.OK)
        

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function createNewBanner(req: Request, res: Response){
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
export async function deleteBanner(req: Request, res: Response){
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
export async function updateBanner(req: Request, res: Response){
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
export async function createCategoryHome(req: Request, res: Response){
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