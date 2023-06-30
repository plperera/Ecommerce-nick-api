import { prisma } from "@/config";

async function findAll(){
    return prisma.image.findMany({
        select: {
            id: true,
            imageUrl: true
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

const imageRepository = {
    findAll,
    createImageRef
}

export default imageRepository