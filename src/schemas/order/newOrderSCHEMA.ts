import joi from "joi"

export type newOrderBody = paymentBody & orderBody

export type paymentPixBody = {
    transaction_amount: number,
    description: string,
    payment_method_id: string,
    payer: {
      email: string,
      first_name: string,
      last_name: string,
      identification: {
          type: string,
          number: string,
      },
      address:  {
          zip_code: string,
          street_name: string,
          street_number: string,
          neighborhood: string,
          city: string,
          federal_unit: string,
      }
    }
};
export type installmentsPix = {
    installments: number
}

export type paymentBody = {
    description: string,
    installments: number,
    issuer_id: string,
    payment_method_id: string,
    token: string,
    transaction_amount: number,
    payer: {
        email: string,
        identification: {
            number: string,
            type: string
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

export type savePaymentBody = {
    paymentType: string,
    installments: number,
    transactionAmount: number,
    expirationMonth: number,
    expirationYear: number,
    firstSixDigits: string,
    lastFourDigits: string,
    
    payerDocumentNumber: string,
    payerDocumentType: string,
    payerEmail: string,

    paymentId: number,
    issuerId: string,
    paymentStatus: string,
    paymentStatusDetails: string,
    
    idempotency: string,
}
export type createNewOrderAndOrderProducts = {
    body: newOrderBody,
    userId: number,
    paymentId: number,
    shippingPrice: number,
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
}
        
export type formatedProductsBody = {
    productId: number,
    orderId: number,
    price: number,
    quantity: number
}[]
const newOrderSCHEMA = joi.object<newOrderBody>({

    description: joi.string().required(),
    installments: joi.number().integer().positive().required(),
    issuer_id: joi.string().required(),
    payment_method_id: joi.string().required(),
    token: joi.string().required(),
    transaction_amount: joi.number().required(),

    addressId: joi.number().integer().positive().required(),
    shippingId: joi.number().integer().positive().required(),
    shippingValue: joi.number().integer().required(),

    cart: joi.array().items(
        joi.object({
            productId: joi.number().integer().positive().required(),
            quantity: joi.number().integer().positive().required(),
        })
    ),

    payer: joi.object({
        email: joi.string().email().required(),
        identification: joi.object({
            number: joi.string().required(),
            type: joi.string().required()
        }).required()
    })
});

export {newOrderSCHEMA}