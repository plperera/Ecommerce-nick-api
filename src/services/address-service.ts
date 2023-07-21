import { userIdBody } from "@/schemas/auth/authTokenSCHEMA";
import addressRepository from "@/repositories/address-repository";
import { addressBody } from "@/schemas/address/addressSCHEMA";
import { addressId, updateAddressBody } from "@/schemas/address/updateAddressSCHEMA";
import { notFoundError } from "@/errors/not-found-error";
import { forbiddenError } from "@/errors/forbidden-error";

async function getAddressByUserId(userId: number){

    const result = await addressRepository.findManyActiveByUserId(userId)

    return result

}
async function verifyLimitAddress(userId: number){

    const allUsersAddress = await addressRepository.findManyActiveByUserId(userId)

    if(allUsersAddress.length >= 4) {
        throw forbiddenError("O usuario chegou no limite de endereços cadastrados")
    }

    return
}
async function createNewAddress(body: addressBody & userIdBody){

    await addressRepository.setAllUserAddress(body.userId)
    await addressRepository.create(body)

    return
}
async function validUpdate(body: updateAddressBody & userIdBody){

    const hasAddress = addressRepository.findActiveWithUserId(body.addressId, body.userId)

    if (!hasAddress){
        throw notFoundError("AddressId inválido")
    }

}
async function updateAddress(body: updateAddressBody & userIdBody){

    await validUpdate(body)

    await addressRepository.setAllUserAddress(body.userId)
    await addressRepository.update(body)

    return
}
async function validAddress(body: addressId & userIdBody){

    const hasAddress = addressRepository.findActiveWithUserId(body.addressId, body.userId)

    if (!hasAddress){
        throw notFoundError("AddressId inválido")
    }

}
async function disableAddress(body: addressId & userIdBody){

    await validAddress(body)

    await addressRepository.disable(body.addressId)

    return
}
async function changeToMainAddress(body: addressId & userIdBody){

    await validAddress(body)

    await addressRepository.setAllUserAddress(body.userId)
    await addressRepository.setUniqueToMainAddress(body.addressId)

    return
}

const addressService = {
    getAddressByUserId,
    createNewAddress,
    updateAddress,
    disableAddress,
    changeToMainAddress,
    verifyLimitAddress
}

export default addressService