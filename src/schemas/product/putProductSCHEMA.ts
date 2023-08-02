import joi from "joi"
import { categoriesArray, imagesArray, tecnicDetailsArray } from "./createProductSCHEMA"

export type putProductBody = productBody & categoriesArray & imagesArray & tecnicDetailsArray

export type productBody = {
    id: number,
    name: string,
    description: string,
    price: number,
    highPrice: number,
    stock: number
}

const putProductSCHEMA = joi.object<putProductBody>({
    id: joi.number().integer().positive().required(),
    name: joi.string().min(3).max(100).required(),
    description: joi.string().min(10).max(1000).required(),
    price: joi.number().integer().min(0).required(),
    highPrice: joi.number().integer().min(0).optional(),
    stock: joi.number().integer().min(0).required(),

    tecnicDetails: joi.array().items(
        joi.object({
            topic: joi.optional(),
            topicDetail: joi.optional()
        })
    ),

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