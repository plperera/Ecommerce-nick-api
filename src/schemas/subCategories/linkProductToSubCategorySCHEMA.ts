import joi from "joi"

type linkProductSubCategoryBody = {
    subCategoryId: number,
    productId: number,
}

const linkProductSubCategorySCHEMA = joi.object<linkProductSubCategoryBody>({
    subCategoryId: joi.number().required(),
    productId: joi.number().required()
})

export {linkProductSubCategorySCHEMA}