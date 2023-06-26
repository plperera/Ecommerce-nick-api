import joi from "joi"
import { newCategoryBody } from "./newCategorySCHEMA"


type categoryId = {
    id: number
}

export type putCategoryBody = categoryId & newCategoryBody

const putCategorySCHEMA = joi.object<putCategoryBody>({

    id: joi.number().required(),
    name: joi.string().required().min(3) 

})

export {putCategorySCHEMA}