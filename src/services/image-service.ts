import { conflictError } from "@/errors/conflict-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import imageRepository from "@/repositories/image-repository";

async function getAllImagesData(){

    const result = await imageRepository.findAll()

    return result
}
async function createImageRef( {imageURL, name}: {imageURL: string, name: string} ){

    await imageRepository.createImageRef({ imageURL, name })

    return 
}
async function deleteImageRef( imageId: number ){

    const hasImage = await imageRepository.findById(imageId)

    if (!hasImage){
        throw notFoundError("Imagem não encontrada")
    }

    await deleteProductImageRef(imageId)

    await imageRepository.deleteImageRef(imageId)

    return 
}

async function deleteProductImageRef( imageId: number ){

    await imageRepository.deleteProductImageRef(imageId)

    return 
}

const imageService = {
    getAllImagesData,
    createImageRef,
    deleteImageRef
}

export default imageService