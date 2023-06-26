import joi from "joi"

export type newCategoryBody = {
    name: string   
}

const newCategorySCHEMA = joi.object<newCategoryBody>({

    name: joi.string().required().min(3) 

})

export {newCategorySCHEMA}