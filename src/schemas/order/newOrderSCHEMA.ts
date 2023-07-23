import joi from "joi"

export type newOrderBody = paymentBody & orderBody

export type paymentBody = {
    installments: number,
    issuer_id: string,
    payment_method_id: string,
    token: string,
    transaction_amount: number,
    payer: {
        email: string,
        identification: {
            number: string
        }
    }
}
export type orderBody = {
    addressId: number,
    shippingId: number,
    shippingValue: number,
    cart: orderCartBody
}
export type orderCartBody = {
    productId: number,
    quantity: number,
}[]

export type verifyValuesBody = {
    products: {
        id: number;
        name: string;
        description: string;
        price: number;
        productImage: {
            mainImage: boolean;
            image: {
                imageUrl: string;
            };
        }[];
    }[]
    cart: orderCartBody,
    shippingValue: number,
    transaction_amount: number
}

const newOrderSCHEMA = joi.object<newOrderBody>({

    installments: joi.number().integer().positive().required(),
    issuer_id: joi.string().required(),
    payment_method_id: joi.string().required(),
    token: joi.string().required(),
    transaction_amount: joi.number().required(),

    addressId: joi.number().integer().positive().required(),
    shippingId: joi.number().integer().positive().required(),
    shippingValue: joi.number().integer().positive().required(),

    cart: joi.array().items(
        joi.object({
            productId: joi.number().integer().positive().required(),
            quantity: joi.number().integer().positive().required(),
        })
    ),

    payer: joi.object({
        email: joi.string().email().required(),
        identification: joi.object({
            number: joi.string().required()
        }).required()
    })
});

export {newOrderSCHEMA}