import { createProduct, disableProduct, getAllProducts, getAllProductsByCategoryId, getUniqueProductsById, getUniqueProductsByName, putProduct } from '@/controllers/product-controller'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const productRouter = Router()

productRouter
    .get("", getAllProducts)
    .get("/category/:categoryId", getAllProductsByCategoryId)
    .get("/unique/:productId", getUniqueProductsById)
    .get("/unique/name/:productName", getUniqueProductsByName)

    .all("/*", authenticateAdminToken)
    .post("/admin", createProduct)
    .put("/admin", putProduct)
    .put("/admin/disable", disableProduct)

export { productRouter }