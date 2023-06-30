import { Response } from "express";
import httpStatus from "http-status";
import bucket from "@/config/firebaseconfig";
import { AuthenticatedAdminRequest } from "@/middlewares/auth/authenticationAdmin-middlerare";

export function SaveImage(req: AuthenticatedAdminRequestWithPublicURL, res: Response){
    try {       

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
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

            console.log(err)

            res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)

        })

        stream.on("finish", async () => {

            await buckerFile.makePublic()

            req.publicImageFileFireBaseURL = `https://storage.googleapis.com/${process.env.BUCKET_URL}/${fileName}`

            res.send(req.publicImageFileFireBaseURL).status(httpStatus.OK)

        })

        stream.end(imageFile.buffer)

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export type AuthenticatedAdminRequestWithPublicURL = AuthenticatedAdminRequest & PublicImageFileFireBaseURL;

type PublicImageFileFireBaseURL = {
    publicImageFileFireBaseURL: string;
};