import { GetAllPayments, GetPaymentById, HandlePaymentInSandbox } from '@/controllers/payments-controller'
import { Router } from 'express'

const paymentRouter = Router()

paymentRouter
    //.all("/*", authenticateAdminToken)
    //.post("", handlePayment)
    .get("", GetAllPayments)
    .get("/unique/:paymentId", GetPaymentById)
    .post("", HandlePaymentInSandbox)

export { paymentRouter }