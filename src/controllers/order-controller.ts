import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares/auth/authentication-middlerare";
import { AuthenticatedAdminRequest } from "@/middlewares/auth/authenticationAdmin-middlerare";
import orderService from "@/services/order-service";
import { newOrderBody, newOrderSCHEMA } from "@/schemas/order/newOrderSCHEMA";


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
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { addressId, shippingId, shippingValue, transaction_amount, cart }: newOrderBody = req.body
        const { userId } = req


        await orderService.verifyAddress({ userId, addressId})

        await orderService.verifyShipping(shippingId)

        const products = await orderService.verifyCart(cart)

        orderService.verifyValues({products, cart, shippingValue, transaction_amount})

    
        //lançar pagamento

        //await orderService.createNewOrder({body: req.body, userId, paymentId})

        return res.sendStatus(httpStatus.CREATED)
        

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