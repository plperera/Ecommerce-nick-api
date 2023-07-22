import joi from "joi"

export type putHomeCategoryBody = {
    homeCategoryId: number,
    imageId: number, 
    categoryId: number,
    subTitle: string,
}

const putHomeCategorySCHEMA = joi.object<putHomeCategoryBody>({

    homeCategoryId: joi.number().required(),
    categoryId: joi.number().required(),
    imageId: joi.number().required(),
    subTitle: joi.string().required().min(1),
})

export {putHomeCategorySCHEMA}