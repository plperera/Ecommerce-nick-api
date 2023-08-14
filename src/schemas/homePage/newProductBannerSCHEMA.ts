import joi from "joi"

export type newProductBannerBody = {
    imageId: number,
    productId: number,
}

const newProductBannerSCHEMA = joi.object<newProductBannerBody>({
    imageId: joi.number().required(),
    productId: joi.number().required()
})

export {newProductBannerSCHEMA}