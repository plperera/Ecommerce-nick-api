import { conflictError } from "@/errors/conflict-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import imageRepository from "@/repositories/image-repository";

async function getAllImagesData(){

    const result = await imageRepository.findAll()

    return result
}

const imageService = {
    getAllImagesData,
}

export default imageService