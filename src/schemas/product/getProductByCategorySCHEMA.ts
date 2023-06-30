import joi from "joi"

export type getProductByCategoryBody = {
    categoryId: number
}

const getProductByCategorySCHEMA = joi.object<getProductByCategoryBody>({

    categoryId: joi.number().required(),

})

export {getProductByCategorySCHEMA}