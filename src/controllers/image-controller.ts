import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedAdminRequest } from "@/middlewares/auth/authenticationAdmin-middlerare";
import imageService from "@/services/image-service";
import { AuthenticatedAdminRequestWithPublicURL } from "@/middlewares/image/uploadImage-middleware";
import { deleleImageSCHEMA } from "@/schemas/image/deleteImageSCHEMA";
import { format } from "date-fns";

export async function getAllImages(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const AllImages = await imageService.getAllImagesData()

        return res.send(AllImages).status(httpStatus.OK)
        

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function createImage(req: AuthenticatedAdminRequestWithPublicURL, res: Response){
    try {        

        const imageURL = req.publicImageFileFireBaseURL

        let { name } = req.body

        if (!name) {
            name = format((new Date()), 'dd/MM/yyyy')
        }
        
        await imageService.createImageRef({ imageURL, name })

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
export async function deleteImage(req: AuthenticatedAdminRequestWithPublicURL, res: Response){
    try {        

        const isValid = deleleImageSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { imageId } = req.body
        
        await imageService.deleteImageRef(imageId)

        return res.sendStatus(httpStatus.OK)


    } catch (error) {
        if(error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}