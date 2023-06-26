import joi from "joi"

type shippingId = {
    id: number
}

const disableShippingSCHEMA = joi.object<shippingId>({

    id: joi.number().required()

})

export {disableShippingSCHEMA}