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

async function verifyImageId( imageId: number ){

    const hasImage = await imageRepository.findById(imageId)

    if(!hasImage){
        throw notFoundError("Imagem não encontrada")
    }

    return hasImage
}
async function verifyLink({ productId, imageId }: {productId: number, imageId: number}) {
    const hasLink = await imageRepository.findByLink({ productId, imageId })
    return hasLink
}

async function handleUnLinkSubCategory(linkId: number) {
    await imageRepository.unLinkProductImage(linkId)
    return 
}
async function handleLinkSubCategory({ productId, imageId }: {productId: number, imageId: number}) {
    await imageRepository.linkProductImage({productId, imageId})
    return 
}

async function deleteProductImageRef( imageId: number ){

    await imageRepository.deleteProductImageRef(imageId)

    return 
}

const imageService = {
    getAllImagesData,
    createImageRef,
    deleteImageRef,
    verifyImageId,
    verifyLink,
    handleUnLinkSubCategory,
    handleLinkSubCategory
}

export default imageService