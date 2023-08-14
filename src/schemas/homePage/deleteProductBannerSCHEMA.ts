import joi from "joi"

export type deleteProductBannerBody = {
    productBannerId: number
}

const deleteProductBannerSCHEMA = joi.object<deleteProductBannerBody>({
    productBannerId: joi.number().required()
})

export {deleteProductBannerSCHEMA}