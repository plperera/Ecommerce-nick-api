import { createNewOrder, getAllUserOrders } from '@/controllers/order-controller'
import { createProduct, disableProduct, getAllProducts, getAllProductsByCategoryId, getUniqueProductsById, putProduct } from '@/controllers/product-controller'
import { authenticateToken } from '@/middlewares/auth/authentication-middlerare'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const orderRouter = Router()

orderRouter
    
    .get("/user",authenticateToken, getAllUserOrders)
    .post("/user",authenticateToken, createNewOrder)

    .all("/*", authenticateAdminToken)

export { orderRouter }