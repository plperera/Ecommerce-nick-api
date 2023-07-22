import { Request, Response } from "express";
import httpStatus from "http-status";
import homePageService from "@/services/homepage-service";
import { AuthenticatedRequest } from "@/middlewares/auth/authentication-middlerare";
import favoriteService from "@/services/favorite-service";
import { newFavoriteSCHEMA } from "@/schemas/favorite/newFavoriteSCHEMA";
import { deleteFavoriteSCHEMA } from "@/schemas/favorite/deleteFavoriteSCHEMA";

export async function getAllFavorites(req: AuthenticatedRequest, res: Response){
    try {  
        const { userId } = req

        const AllFavoritesProductsData = await favoriteService.getAllFavoritesProductsDataByUserId(userId)

        return res.send(AllFavoritesProductsData).status(httpStatus.OK)
        

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function NewFavoriteProduct(req: AuthenticatedRequest, res: Response){
    try {  
        const { userId } = req

        const isValid = newFavoriteSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { productId } = req.body

        await favoriteService.verifyProductId(productId)
        await favoriteService.verifyNotHasFavoriteProductId({userId, productId})

        await favoriteService.createNewFavoriteProduct({productId, userId})

        return res.sendStatus(httpStatus.CREATED)
        

    } catch (error) {
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        if (error.name === "ConflictError") {
            return res.status(httpStatus.CONFLICT).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function RemoveFavoriteProduct(req: AuthenticatedRequest, res: Response){
    try {  
        const { userId } = req

        const isValid = deleteFavoriteSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { productId } = req.body

        await favoriteService.verifyProductId(productId)
        const favoriteResponse = await favoriteService.verifyHasFavoriteProductId({userId, productId})

        await favoriteService.removeFavoriteProduct(favoriteResponse.id)

        return res.sendStatus(httpStatus.CREATED)
        

    } catch (error) {
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        if (error.name === "ConflictError") {
            return res.status(httpStatus.CONFLICT).send(error);
        }
        if (error.name === "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}