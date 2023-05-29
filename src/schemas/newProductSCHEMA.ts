import joi from "joi"

export type newProductBody = {

    nome: string,
    rate: number,
    descricao: string,
    price: number,
    stock: number,
    //salesAmount: number
    categorias: {
        categoryId: number
    }[]
    imagens: {
        mainImage: boolean,
        imageUrl: string 
    }[]
}
type categorias = {
    categoryId: number
}
type images = {
    mainImage: boolean,
    imageUrl: string 
}

const newProductCategoriasSCHEMA = joi.object<categorias>({

    categoryId: joi.number().required(),

})

const newProductImagesBodySCHEMA = joi.object<images>({

    mainImage: joi.boolean().required(),
    imageUrl: joi.string().required()

})

const newProductSCHEMA = joi.object<newProductBody>({
    
    nome: joi.string().required().min(4),
    rate: joi.number().required(),
    descricao: joi.string(),
    price: joi.number().required(),
    stock: joi.number().required(),
    categorias: joi.array().items(newProductCategoriasSCHEMA).required(),
    imagens: joi.array().items(newProductImagesBodySCHEMA).required(),

})

export {newProductSCHEMA}