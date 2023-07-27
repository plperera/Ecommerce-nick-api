import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares/auth/authentication-middlerare";
import { AuthenticatedAdminRequest } from "@/middlewares/auth/authenticationAdmin-middlerare";
import orderService from "@/services/order-service";
import { newOrderBody, newOrderSCHEMA, savePaymentBody } from "@/schemas/order/newOrderSCHEMA";
import paymentService from "@/services/payments-service";


export async function getAllUserOrders(req: AuthenticatedRequest, res: Response){
    try {        
        const { userId } = req

        const AllOrders = await orderService.getAllOrdersDataByUser(userId)

        return res.send(AllOrders).status(httpStatus.OK)
        

    } catch (error) {
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        if (error.name === "ForbiddenError") {
            return res.status(httpStatus.FORBIDDEN).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function createNewOrder(req: AuthenticatedRequest, res: Response){
    try {        

        
        const isValid = newOrderSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { description, installments, issuer_id, payment_method_id, token, transaction_amount, payer}: newOrderBody = req.body

        const paymentBody = { description, installments, issuer_id, payment_method_id, token, transaction_amount, payer}

        const { addressId, shippingId, shippingValue, cart }: newOrderBody = req.body
        const { userId } = req

        await orderService.verifyAddress({ userId, addressId})
        const products = await orderService.verifyCart(cart)
        orderService.verifyValues({products, cart, shippingValue, transaction_amount})
        await orderService.verifyShipping({shippingValue, shippingId})

        const paymentId = await paymentService.savePayment({paymentData: paymentBody, userId})
        
        await orderService.createNewOrder({body: req.body, userId, paymentId: paymentId, products: products, shippingPrice: shippingValue})
        
        return res.sendStatus(httpStatus.CREATED)
        

    } catch (error) {
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if (error.name === "BadRequestError") {
            console.log(error.message)
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        if (error.name === "ForbiddenError") {
            return res.status(httpStatus.FORBIDDEN).send(error);
        }
        console.log(error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}