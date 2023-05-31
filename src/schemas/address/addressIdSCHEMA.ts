import joi from "joi"
import { addressId } from "./updateAddressSCHEMA"

const addressIdSCHEMA = joi.object<addressId>({

    addressId: joi.number().required(), 

})

export {addressIdSCHEMA}