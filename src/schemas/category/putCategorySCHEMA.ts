import joi from "joi"
import { newCategoryBody } from "./newCategorySCHEMA"


type categoryId = {
    categoryId: number
}

export type putCategoryBody = categoryId & newCategoryBody

const putCategorySCHEMA = joi.object<putCategoryBody>({

    categoryId: joi.number().required(),
    categoryName: joi.string().required().min(3) 

})

export {putCategorySCHEMA}