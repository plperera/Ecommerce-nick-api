import { createNewOrder, createNewOrderByPix, getAllUserOrders, updateOrderStatus } from '@/controllers/order-controller'
import { authenticateToken } from '@/middlewares/auth/authentication-middlerare'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const orderRouter = Router()

orderRouter
    
    .get("", authenticateToken, getAllUserOrders)
    .post("", authenticateToken, createNewOrder)
    .post("/pix", authenticateToken, createNewOrderByPix)

    .all("/*", authenticateAdminToken)
    .get("/admin", getAllUserOrders)
    .put("/admin", updateOrderStatus)


export { orderRouter }