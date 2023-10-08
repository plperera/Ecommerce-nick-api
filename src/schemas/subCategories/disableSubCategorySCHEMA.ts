import joi from "joi"

type disableSubCategoryBody = {
    subCategoryId: number
}

const disableSubCategorySCHEMA = joi.object<disableSubCategoryBody>({

    subCategoryId: joi.number().required()

})

export {disableSubCategorySCHEMA}