import { activeProduct, createProduct, disableProduct, getAllProductWithAllData, getAllProducts, getAllProductsById, getAllProductsBySubCategoryId, getUniqueProductsById, getUniqueProductsByName, handleProductImageLink, putProduct } from '@/controllers/product-controller'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const productRouter = Router()

productRouter
    .get("", getAllProducts)
    .get("/findmany/:productIdArray", getAllProductsById)
    .get("/category/:categoryId", getAllProductsBySubCategoryId)
    .get("/unique/:productId", getUniqueProductsById)
    .get("/unique/name/:productName", getUniqueProductsByName)

    .all("/*", authenticateAdminToken)
    .get("/admin", getAllProductWithAllData)
    .post("/admin", createProduct)
    .put("/admin", putProduct)
    .put("/admin/imagelink", handleProductImageLink)
    .put("/admin/disable", disableProduct)
    .put("/admin/enable", activeProduct)

export { productRouter }