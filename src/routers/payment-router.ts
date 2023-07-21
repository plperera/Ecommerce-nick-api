import { handlePayment } from '@/controllers/payments-controller'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const paymentRouter = Router()

paymentRouter
    //.all("/*", authenticateAdminToken)
    .post("", handlePayment)

export { paymentRouter }