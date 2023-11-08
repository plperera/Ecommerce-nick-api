import { prisma } from "@/config";

async function findAll(){
    return prisma.image.findMany({
        select: {
            id: true,
            imageUrl: true,
            imageName: true,
            productImage: {
                select: {
                    productId: true,
                }
            }
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
async function findByLink({ productId, imageId }: {productId: number, imageId: number}){
    return prisma.productImage.findFirst({
        where: {
            productId: productId,
            imageId: imageId
        }
    });
}
async function createImageRef( {imageURL, name}: {imageURL: string, name: string} ){
    return prisma.image.create({
       data: {
        imageUrl: imageURL,
        imageName: name
       }
    });
}
async function deleteImageRef(imageURL: number){
    return prisma.image.delete({
       where: {
        id: imageURL
       }
    });
}
async function deleteProductImageRef(imageURL: number){
    return prisma.productImage.deleteMany({
       where: {
        imageId: imageURL
       }
    });
}
async function unLinkProductImage(linkId: number){
    return prisma.productImage.delete({
        where: {
            id: linkId
        }
    })
}

async function linkProductImage({ productId, imageId }: {productId: number, imageId: number}){
    return prisma.productImage.create({
        data: {
            productId: productId,
            imageId: imageId
        }
    })
}

const imageRepository = {
    findAll,
    createImageRef,
    findById,
    deleteImageRef,
    deleteProductImageRef,
    findByLink,
    unLinkProductImage,
    linkProductImage
}

export default imageRepository