import joi from "joi"

export type createProductBody = productBody & subCategoriesArray & imagesArray & tecnicDetailsArray

export type productBody = {
    name: string,
    description: string,
    price: number,
    highPrice: number,
    stock: number
}
export type subCategoriesArray = {
    subCategories: {
        subCategoryId: number,
    }[],
}
export type imagesArray = {
    images: {
        mainImage: boolean,
        imageId: number
    }[]
}
export type tecnicDetailsArray = {
    tecnicDetails: {
        topic: string,
        topicDetail: string | null
    }[]
}

const createProductSCHEMA = joi.object<createProductBody>({
    name: joi.string().min(3).max(100).required(),
    description: joi.string().min(5).required(),
    highPrice: joi.number().integer().min(0).optional(),
    price: joi.number().integer().min(0).required(),
    stock: joi.number().integer().min(0).required(),

    tecnicDetails: joi.array().items(
        joi.object({
            topic: joi.string().min(1).optional(),
            topicDetail: joi.optional()
        })
    ),

    subCategories: joi.array().items(
        joi.object({
            subCategoryId: joi.number().integer().positive().required()
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