import { prisma } from "@/config";
import { addressBody } from "@/schemas/address/addressSCHEMA";
import { addressId, updateAddressBody } from "@/schemas/address/updateAddressSCHEMA";
import { userIdBody } from "@/schemas/auth/authTokenSCHEMA";

async function findManyActiveByUserId(userId: number){
    return prisma.address.findMany({
        where: {
            isActive: true,
            userId: userId 
        }
    });
}
async function findActiveWithUserId(addressId: number, userId: number){
    return prisma.address.findFirst({
        where: {
            isActive: true,
            id: addressId ,
            userId: userId
        }
    });
}
async function setAllUserAddress(userId: number){
    return prisma.address.updateMany({
        where: {
            userId: userId 
        },
        data: {
            mainAddress: false
        }
    });
}
async function setUniqueToMainAddress(addressId: number){
    return prisma.address.updateMany({
        where: {
            id: addressId 
        },
        data: {
            mainAddress: true
        }
    });
}
async function create(body: addressBody & userIdBody){
    return prisma.address.create({
        data: {
            addressName: body.addressName,
            cep: body.cep,
            city: body.city,
            neighborhood: body.neighborhood,
            number: body.number,
            state: body.state,
            street: body.street,
            userId: body.userId,
            addressDetail: body?.addressDetail || null,
        }
    });
}
async function update(body: updateAddressBody & userIdBody){
    return prisma.address.update({
        where:{
            id: body.addressId
        },
        data: {
            addressName: body.addressName,
            cep: body.cep,
            city: body.city,
            neighborhood: body.neighborhood,
            number: body.number,
            state: body.state,
            street: body.street,
            userId: body.userId,
            addressDetail: body?.addressDetail || null,
        }
    });
}
async function disable(addressId: number){
    return prisma.address.update({
        where:{
            id: addressId
        },
        data: {
           isActive: false
        }
    });
}

const addressRepository = {
    findManyActiveByUserId,
    findActiveWithUserId,
    setAllUserAddress,
    setUniqueToMainAddress,
    create,
    update,
    disable
}

export default addressRepository