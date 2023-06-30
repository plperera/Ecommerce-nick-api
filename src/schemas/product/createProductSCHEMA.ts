import joi from "joi"

export type createProductBody = productBody & categoriesArray & imagesArray

export type productBody = {
    name: string,
    description: string,
    price: number,
    stock: number
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

const createProductSCHEMA = joi.object<createProductBody>({
    name: joi.string().min(3).max(100).required(),
    description: joi.string().min(10).max(1000).required(),
    price: joi.number().integer().positive().required(),
    stock: joi.number().integer().positive().required(),
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

export {createProductSCHEMA}