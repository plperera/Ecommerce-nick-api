import { conflictError } from "@/errors/conflict-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import shippingRepository from "@/repositories/shipping-repository";
import { newShippingBody } from "@/schemas/shipping/newShippingSCHEMA";
import { putShippingBody } from "@/schemas/shipping/putShippingSCHEMA";

async function getAllShippingData(){

    const result = await shippingRepository.findAllActive()

    return result

}
async function verifyName(name: string){

    const result = await shippingRepository.findByName(name)

    if ( result ){
        throw conflictError("Nome de método de entrega já existente")
    }

    return 
}
async function verifyNameBelongsId ({ name, id }: Omit<putShippingBody, "price">){

    const result = await shippingRepository.findByName(name)

    if ( result && result?.id !== id){
        throw conflictError("Nome de método de entrega já atrelado a outro id")
    }

    return 
}
async function verifyValidId(id: number){

    const result = await shippingRepository.findById(id)

    if ( !result ){
        throw notFoundError("Não existe método de entrega com o ID passado")
    }

    return 
}
async function create({ name, price }: newShippingBody){

    await shippingRepository.createMethod({name, price})

    return 
}
async function putShipping({ name, price, id }: putShippingBody){

    await shippingRepository.putShipping({ name, price, id })

    return 
}
async function disableShipping(id: number){

    await shippingRepository.disableShipping( id )

    return 
}

const shippingService = {
    getAllShippingData,
    verifyName,
    create,
    verifyValidId,
    putShipping,
    disableShipping,
    verifyNameBelongsId
}

export default shippingService