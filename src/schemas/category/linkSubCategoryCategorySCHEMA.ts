import joi from "joi"

type linkCategorySubCategoryBody = {
    subCategoryId: number,
    categoryId: number,
}

const linkCategorySubCategorySCHEMA = joi.object<linkCategorySubCategoryBody>({
    subCategoryId: joi.number().required(),
    categoryId: joi.number().required()
})

export {linkCategorySubCategorySCHEMA}