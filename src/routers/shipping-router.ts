import { createShippingMethod, disableShippingMethod, enableShippingMethod, getAllShippingMethods, getAllShippingMethodsData, putShippingMethod } from '@/controllers/shipping-controller'
import { authenticateToken } from '@/middlewares/auth/authentication-middlerare'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const shippingRouter = Router()

shippingRouter
    
    .get("", getAllShippingMethods)

    .all("/*", authenticateAdminToken)
    .get("/admin", getAllShippingMethodsData)
    .post("/admin", createShippingMethod)
    .put("/admin", putShippingMethod)
    .put("/admin/disable", disableShippingMethod)
    .put("/admin/enable", enableShippingMethod)

export { shippingRouter }