import joi from "joi"
import { addressBody } from "./addressSCHEMA"

export type addressId = {
    addressId: number,
}

export type updateAddressBody = addressId & addressBody

const updateAddressSCHEMA = joi.object<updateAddressBody>({

    addressId: joi.number().required(), 
    addressName: joi.string().required(),
    cep: joi.string().required().min(8), 
    street: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    number: joi.string().required(),
    neighborhood: joi.string().required(),
    addressDetail: joi.string()

})

export {updateAddressSCHEMA}