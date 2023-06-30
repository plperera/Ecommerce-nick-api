import { prisma } from "@/config";

async function findAll(){
    return prisma.image.findMany({
        select: {
            id: true,
            imageUrl: true
        }
    });
}
async function findById( imageId: number ){
    return prisma.image.findUnique({
        where: {
            id: imageId
        }
    });
}
async function createImageRef( imageURL: string ){
    return prisma.image.create({
       data: {
        imageUrl: imageURL
       }
    });
}
async function deleteImageRef( imageURL: number ){
    return prisma.image.delete({
       where: {
        id: imageURL
       }
    });
}
async function deleteProductImageRef( imageURL: number ){
    return prisma.productImage.deleteMany({
       where: {
        imageId: imageURL
       }
    });
}

const imageRepository = {
    findAll,
    createImageRef,
    findById,
    deleteImageRef,
    deleteProductImageRef
}

export default imageRepository