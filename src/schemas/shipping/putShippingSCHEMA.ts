import joi from "joi"
import { newShippingBody } from "./newShippingSCHEMA"

type shippingId = {
    id: number
}

export type putShippingBody = shippingId & newShippingBody

const putShippingSCHEMA = joi.object<putShippingBody>({

    id: joi.number().required(), 
    name: joi.string().required().min(3), 
    price: joi.number().required()

})

export {putShippingSCHEMA}