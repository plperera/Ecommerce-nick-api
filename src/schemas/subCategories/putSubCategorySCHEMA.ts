import joi from "joi"
import { newSubCategoryBody } from "./newSubCategorySCHEMA"

type subCategoryId = {
    subCategoryId: number
}

export type putCategoryBody = subCategoryId & newSubCategoryBody

const putSubCategorySCHEMA = joi.object<putCategoryBody>({

    subCategoryId: joi.number().required(),
    subCategoryName: joi.string().required().min(3) 

})

export {putSubCategorySCHEMA}