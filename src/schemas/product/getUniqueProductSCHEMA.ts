import joi from "joi"

export type getUniqueProductBody = {
    productId: number
}

const getUniqueProductSCHEMA = joi.object<getUniqueProductBody>({

    productId: joi.number().required(),

})

export {getUniqueProductSCHEMA}