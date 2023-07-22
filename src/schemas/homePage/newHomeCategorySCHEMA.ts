import joi from "joi"

export type newHomeCategoryBody = {
    subTitle: string,
    imageId: number,
    categoryId: number,
}

const newHomeCategorySCHEMA = joi.object<newHomeCategoryBody>({

    subTitle: joi.string().required().min(1),
    imageId: joi.number().required(),
    categoryId: joi.number().required()

})

export {newHomeCategorySCHEMA}