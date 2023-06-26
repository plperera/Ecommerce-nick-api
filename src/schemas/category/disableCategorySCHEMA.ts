import joi from "joi"
import { newCategoryBody } from "./newCategorySCHEMA"

type disableCategoryBody = {
    id: number
}

const disableCategorySCHEMA = joi.object<disableCategoryBody>({

    id: joi.number().required()

})

export {disableCategorySCHEMA}