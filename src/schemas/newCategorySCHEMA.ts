import joi from "joi"

export type newCategoryBody = {
    nome: string
}


const newCategorySCHEMA = joi.object<newCategoryBody>({
    
    nome: joi.string().required().min(4),

})

export {newCategorySCHEMA}