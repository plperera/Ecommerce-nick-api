import joi from "joi"
import { newCategoryBody } from "./newCategorySCHEMA"

type disableCategoryBody = {
    categoryId: number
}

const disableCategorySCHEMA = joi.object<disableCategoryBody>({

    categoryId: joi.number().required()

})

export {disableCategorySCHEMA}