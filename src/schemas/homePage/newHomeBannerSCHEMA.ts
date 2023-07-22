import joi from "joi"

export type newHomeBannerBody = {
    text: string,
    imageId: number
}

const newHomeBannerSCHEMA = joi.object<newHomeBannerBody>({

    text: joi.string().required().min(1),
    imageId: joi.number().required(),

})

export {newHomeBannerSCHEMA}