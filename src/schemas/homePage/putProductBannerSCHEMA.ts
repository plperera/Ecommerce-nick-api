import joi from "joi"

export type putProductBannerBody = {
    productBannerId: number,
    productId: number,
    imageId: number
}

const putProductBannerSCHEMA = joi.object<putProductBannerBody>({
    productBannerId: joi.number().required(),
    productId: joi.number().required(),
    imageId: joi.number().required()
})

export {putProductBannerSCHEMA}