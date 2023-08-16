import joi from "joi"

export type putHomeCategoryBody = {
    homeCategoryId: number,
    imageId: number, 
    categoryId: number
}

const putHomeCategorySCHEMA = joi.object<putHomeCategoryBody>({

    homeCategoryId: joi.number().required(),
    categoryId: joi.number().required(),
    imageId: joi.number().required()
})

export {putHomeCategorySCHEMA}