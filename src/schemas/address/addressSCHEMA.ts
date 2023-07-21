import joi from "joi"

export type addressBody = {
    addressName: string,
    cep: string,
    street: string,
    city: string,
    state: string,
    number: string,
    neighborhood: string,
    addressDetail: string
}

const addressSCHEMA = joi.object<addressBody>({

    addressName: joi.string().required(),
    cep: joi.string().required().min(8), 
    street: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    number: joi.string().required(),
    neighborhood: joi.string().required(),
    addressDetail: joi.string()

})

export {addressSCHEMA}