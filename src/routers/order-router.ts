import { createNewOrder, getAllUserOrders } from '@/controllers/order-controller'
import { authenticateToken } from '@/middlewares/auth/authentication-middlerare'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const orderRouter = Router()

orderRouter
    
    .get("", authenticateToken, getAllUserOrders)
    .post("", authenticateToken, createNewOrder)

    .all("/*", authenticateAdminToken)

export { orderRouter }