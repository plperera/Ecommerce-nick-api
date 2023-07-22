import joi from "joi"

export type deleteHomeCategoryBody = {
    homeCategoryId: number
}

const deleteHomeCategorySCHEMA = joi.object<deleteHomeCategoryBody>({

    homeCategoryId: joi.number().required()

})

export {deleteHomeCategorySCHEMA}