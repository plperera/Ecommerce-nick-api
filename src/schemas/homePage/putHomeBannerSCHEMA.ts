import joi from "joi"

export type putHomeBannerBody = {
    bannerId: number,
    text: string,
    imageId: number,
}

const putHomeBannerSCHEMA = joi.object<putHomeBannerBody>({

    text: joi.string().required().min(1),
    imageId: joi.number().required(),
    bannerId: joi.number().required(),

})

export {putHomeBannerSCHEMA}