import { createShippingMethod, disableShippingMethod, getAllShippingMethods, putShippingMethod } from '@/controllers/shipping-controller'
import { authenticateToken } from '@/middlewares/auth/authentication-middlerare'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const shippingRouter = Router()

shippingRouter
    
    .get("", authenticateToken, getAllShippingMethods)

    .all("/*", authenticateAdminToken)
    .post("/admin", createShippingMethod)
    .put("/admin", putShippingMethod)
    .put("/admin/disable", disableShippingMethod)

export { shippingRouter }