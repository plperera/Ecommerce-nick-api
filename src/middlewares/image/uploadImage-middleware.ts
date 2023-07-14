import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { AuthenticatedAdminRequest } from "../auth/authenticationAdmin-middlerare";
import bucket from "@/config/firebaseconfig";

export async function uploadImage(req: AuthenticatedAdminRequestWithPublicURL, res: Response, next: NextFunction) {
          
    if (!req.file) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const imageFile = req.file

    const fileName = `${Date.now()}.${imageFile.originalname.split(".").pop()}`;

    const buckerFile = bucket.file(fileName);

    const stream = buckerFile.createWriteStream({
        metadata: {
            contentType: imageFile.mimetype
        }
    })
    
    stream.on("error", (err) => {

        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)

    })

    stream.on("finish", async () => {

        await buckerFile.makePublic()

        req.publicImageFileFireBaseURL = `https://storage.googleapis.com/${process.env.BUCKET_URL}/${fileName}`

        next()
        
    })

    stream.end(imageFile.buffer)

}


export type AuthenticatedAdminRequestWithPublicURL = AuthenticatedAdminRequest & PublicImageFileFireBaseURL;

type PublicImageFileFireBaseURL = {
    publicImageFileFireBaseURL: string;
};
