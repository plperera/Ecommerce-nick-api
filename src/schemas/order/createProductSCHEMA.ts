import joi from "joi"

export type createOrderBody = {
	addressId: number,
	methodId: number,
	shippingPrice: number,
	products: createOrderProduct[]
}
export type createOrderProduct = {
    productId: number,
    price: number,
    amount: number
}

const createOrderSCHEMA = joi.object<createOrderBody>({

    addressId: joi.number().integer().positive().required(),
	methodId: joi.number().integer().positive().required(),
	shippingPrice: joi.number().integer().positive().required(),
	products: joi.array().items(
        joi.object({
            productId: joi.number().integer().positive().required(),
            price: joi.number().integer().positive().required(),
            amount: joi.number().integer().positive().required()
        })
    ).min(1).required()

});

export {createOrderSCHEMA}