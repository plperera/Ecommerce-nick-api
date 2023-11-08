import joi from "joi"

type linkProductImage = {
    productId: number,
    imageId: number,
}

const linkProductImageSCHEMA = joi.object<linkProductImage>({
    productId: joi.number().positive().required(),
    imageId: joi.number().positive().required()
})

export {linkProductImageSCHEMA}