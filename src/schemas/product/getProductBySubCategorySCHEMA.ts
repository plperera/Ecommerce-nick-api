import joi from "joi"

export type getProductBySubCategoryBody = {
    subCategoryId: number
}

const getProductBySubCategorySCHEMA = joi.object<getProductBySubCategoryBody>({

    subCategoryId: joi.number().required(),

})

export {getProductBySubCategorySCHEMA}