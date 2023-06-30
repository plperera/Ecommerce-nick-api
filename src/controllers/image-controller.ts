import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedAdminRequest } from "@/middlewares/auth/authenticationAdmin-middlerare";
import imageService from "@/services/image-service";
import { AuthenticatedAdminRequestWithPublicURL } from "@/middlewares/image/uploadImage-middleware";

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
        
        await imageService.createImageRef( imageURL )

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
export async function deleteImage(req: AuthenticatedAdminRequestWithPublicURL, res: Response){
    try {        

        //const isValid = deleteImageSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { id } = req.body
        
        await imageService.createImageRef( id )

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