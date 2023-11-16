import joi from "joi"

export type newHomeCategoryBody = {
    imageId: number,
    subCategoryId: number,
}

const newHomeCategorySCHEMA = joi.object<newHomeCategoryBody>({
    imageId: joi.number().required(),
    subCategoryId: joi.number().required()
})

export {newHomeCategorySCHEMA}