import joi from "joi"

export type putHomeCategoryBody = {
    homeCategoryId: number,
    imageId: number, 
    subCategoryId: number
}

const putHomeCategorySCHEMA = joi.object<putHomeCategoryBody>({

    homeCategoryId: joi.number().required(),
    subCategoryId: joi.number().required(),
    imageId: joi.number().required()
})

export {putHomeCategorySCHEMA}