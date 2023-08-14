import joi from "joi"

export type newHomeCategoryBody = {
    imageId: number,
    categoryId: number,
}

const newHomeCategorySCHEMA = joi.object<newHomeCategoryBody>({
    imageId: joi.number().required(),
    categoryId: joi.number().required()
})

export {newHomeCategorySCHEMA}