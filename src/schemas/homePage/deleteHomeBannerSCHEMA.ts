import joi from "joi"

export type deleteHomeBannerBody = {
    bannerId: string,
}

const deleteHomeBannerSCHEMA = joi.object<deleteHomeBannerBody>({

    bannerId: joi.number().required(),

})

export {deleteHomeBannerSCHEMA}