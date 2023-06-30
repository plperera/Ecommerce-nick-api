import { getAllImages } from '@/controllers/image-controller'
import { getAllProducts, getAllProductsByCategoryId, getUniqueProductsById } from '@/controllers/product-controller'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const imageRouter = Router()

imageRouter

    .all("/*", authenticateAdminToken)
    .get("/", getAllImages)
    .post("/",)//createImage
    .delete("/", )//deleteImage
    

export { imageRouter }