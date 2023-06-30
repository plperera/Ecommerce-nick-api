import { getAllProducts, getAllProductsByCategoryId, getUniqueProductsById } from '@/controllers/product-controller'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const productRouter = Router()

productRouter
    .get("", getAllProducts)
    .get("/category/:categoryId", getAllProductsByCategoryId)
    .get("/unique/:productId", getUniqueProductsById)

    .all("/*", authenticateAdminToken)
    .post("/",)//createProduct
    .put("/", )//putProduct
    .put("/", )//disableProduct

export { productRouter }