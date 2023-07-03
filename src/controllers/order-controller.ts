import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares/auth/authentication-middlerare";
import { AuthenticatedAdminRequest } from "@/middlewares/auth/authenticationAdmin-middlerare";
import productService from "@/services/product-service";
import { getProductByCategorySCHEMA } from "@/schemas/product/getProductByCategorySCHEMA";
import { getUniqueProductSCHEMA } from "@/schemas/product/getUniqueProductSCHEMA";
import { createProductSCHEMA } from "@/schemas/product/createProductSCHEMA";
import { putProductSCHEMA } from "@/schemas/product/putProductSCHEMA";
import { disableProductSCHEMA } from "@/schemas/product/deleteProductSCHEMA";
import orderService from "@/services/order-service";
import { createOrderSCHEMA } from "@/schemas/order/createProductSCHEMA";

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

        const isValid = createOrderSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { addressId, methodId, shippingPrice, products} = req.body
        const { userId } = req


        await orderService.verifyAddress({ userId, addressId})
        await orderService.verifyShipping(methodId)
        await orderService.verifyProducts(products)

        await orderService.createNewOrder({body: req.body, userId})

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