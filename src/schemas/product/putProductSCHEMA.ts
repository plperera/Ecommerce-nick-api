import joi from "joi"

export type putProductBody = productBody & categoriesArray & imagesArray

export type productBody = {
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    salesNumber: number
}
export type categoriesArray = {
    categories: {
        categoryId: number,
    }[],
}
export type imagesArray = {
    images: {
        mainImage: boolean,
        imageId: number
    }[]
}

const putProductSCHEMA = joi.object<putProductBody>({
    id: joi.number().integer().positive().required(),
    name: joi.string().min(3).max(100).required(),
    description: joi.string().min(10).max(1000).required(),
    price: joi.number().integer().positive().required(),
    stock: joi.number().integer().positive().required(),
    salesNumber: joi.number().integer().required(),
    categories: joi.array().items(
        joi.object({
            categoryId: joi.number().integer().positive().required()
        })
    ).min(1).required(),
    images: joi.array().items(
        joi.object({
            mainImage: joi.boolean().required(),
            imageId: joi.number().integer().positive().required()
        })
    ).min(1).required()
});

export {putProductSCHEMA}