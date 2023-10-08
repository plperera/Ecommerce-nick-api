import joi from "joi"

export type newSubCategoryBody = {
    subCategoryName: string   
}

const newSubCategorySCHEMA = joi.object<newSubCategoryBody>({

    subCategoryName: joi.string().required().min(3) 

})

export {newSubCategorySCHEMA}