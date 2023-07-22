import joi from "joi"

export type deleteHomeBannerBody = {
    bannerId: number,
}

const deleteHomeBannerSCHEMA = joi.object<deleteHomeBannerBody>({

    bannerId: joi.number().required(),

})

export {deleteHomeBannerSCHEMA}