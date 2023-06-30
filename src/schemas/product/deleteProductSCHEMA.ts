import joi from "joi"

type disableProductBody = {
    id: number
}

const disableProductSCHEMA = joi.object<disableProductBody>({

    id: joi.number().required()

})

export {disableProductSCHEMA}