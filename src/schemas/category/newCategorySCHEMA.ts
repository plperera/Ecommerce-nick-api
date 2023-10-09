import joi from "joi"

export type newCategoryBody = {
    categoryName: string   
}

const newCategorySCHEMA = joi.object<newCategoryBody>({

    categoryName: joi.string().required().min(3) 

})

export {newCategorySCHEMA}