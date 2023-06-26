import joi from "joi"

export type newShippingBody = {
    name: string,
    price: number
}

const newShippingSCHEMA = joi.object<newShippingBody>({

    name: joi.string().required().min(3), 
    price: joi.number().required()

})

export {newShippingSCHEMA}