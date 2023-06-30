import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares/auth/authentication-middlerare";
import { AuthenticatedAdminRequest } from "@/middlewares/auth/authenticationAdmin-middlerare";
import productService from "@/services/product-service";
import { getProductByCategorySCHEMA } from "@/schemas/product/getProductByCategorySCHEMA";
import { getUniqueProductSCHEMA } from "@/schemas/product/getUniqueProductSCHEMA";
import imageService from "@/services/image-service";

export async function getAllImages(req: AuthenticatedRequest, res: Response){
    try {        

        const AllImages = await imageService.getAllImagesData()

        return res.send(AllImages).status(httpStatus.OK)
        

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}