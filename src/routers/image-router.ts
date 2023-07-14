import Multer from '@/config/multerconfig'
import { createImage, deleteImage, getAllImages } from '@/controllers/image-controller'
import { getAllProducts, getAllProductsByCategoryId, getUniqueProductsById } from '@/controllers/product-controller'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { uploadImage } from '@/middlewares/image/uploadImage-middleware'
import { Router } from 'express'

const imageRouter = Router()

imageRouter

    .all("/*", authenticateAdminToken)
    .get("/admin", getAllImages)
    .post("/admin", Multer.single('imageFile'), uploadImage, createImage)
    .delete("/admin", deleteImage)
    

export { imageRouter }