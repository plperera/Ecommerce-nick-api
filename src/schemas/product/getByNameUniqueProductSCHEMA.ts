import joi from "joi"

export type getByNameUniqueProductBody = {
    productName: string
}

const getByNameUniqueProductSCHEMA = joi.object<getByNameUniqueProductBody>({

    productName: joi.string().required(),

})

export {getByNameUniqueProductSCHEMA}