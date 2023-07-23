import { prisma } from "@/config";
import { addressBody } from "@/schemas/address/addressSCHEMA";
import { addressId, updateAddressBody } from "@/schemas/address/updateAddressSCHEMA";
import { userIdBody } from "@/schemas/auth/authTokenSCHEMA";
import { newShippingBody } from "@/schemas/shipping/newShippingSCHEMA";
import { putShippingBody } from "@/schemas/shipping/putShippingSCHEMA";

async function findAllActive(){
    return prisma.shipping.findMany({
        where: {
            isActive: true
        },
        select: {
            id: true,
            name: true,
            price: true
        }
    });
}
async function findByName(name: string){
    return prisma.shipping.findFirst({
        where: {
            name: name
        }
    });
}
async function findById(id: number){
    return prisma.shipping.findFirst({
        where: {
            id: id,
            isActive: true
        }
    });
}
async function createMethod({ name, price }: newShippingBody){
    return prisma.shipping.create({
        data: {
            name: name,
            price: price
        }
    });
}
async function putShipping({ name, price, id }: putShippingBody){
    return prisma.shipping.update({
        where: {
            id: id
        },
        data: {
            name: name,
            price: price
        }
    });
}
async function disableShipping( id : number ){
    return prisma.shipping.update({
        where: {
            id: id
        },
        data: {
            isActive: false
        }
    });
}

const shippingRepository = {
    findAllActive,
    findByName,
    findById,
    createMethod,
    putShipping,
    disableShipping
}

export default shippingRepository