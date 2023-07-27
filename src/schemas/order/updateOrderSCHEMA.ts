import joi from "joi"

export type updateOrderBody = {
    orderId: number,
    status: string
}

const updateOrderSCHEMA = joi.object<updateOrderBody>({

    orderId: joi.number().integer().positive().required(),
    status: joi.string().required()

});

export {updateOrderSCHEMA}