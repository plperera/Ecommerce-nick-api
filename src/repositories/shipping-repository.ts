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
async function findAll(){
    return prisma.shipping.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            isActive: true
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
async function findAllById(id: number){
    return prisma.shipping.findFirst({
        where: {
            id: id,
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
async function enableShipping( id : number ){
    return prisma.shipping.update({
        where: {
            id: id
        },
        data: {
            isActive: true
        }
    });
}

const shippingRepository = {
    findAllActive,
    findAll,
    findByName,
    findById,
    findAllById,
    createMethod,
    putShipping,
    disableShipping,
    enableShipping
}

export default shippingRepository