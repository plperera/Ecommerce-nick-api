import { prisma } from "@/config";
import { newCategoryBody } from "@/schemas/category/newCategorySCHEMA";
import { putCategoryBody } from "@/schemas/category/putCategorySCHEMA";

async function findAll(){
    return prisma.image.findMany({
        select: {
            id: true,
            imageUrl: true
        }
    });
}

const imageRepository = {
    findAll,
}

export default imageRepository