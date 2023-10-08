import { prisma } from "@/config";
import { newCategoryBody } from "@/schemas/category/newCategorySCHEMA";
import { putCategoryBody } from "@/schemas/category/putCategorySCHEMA";

async function findAllActive(){
    return prisma.category.findMany({
        where: {
            isActive: true
        },
        select: {
            id: true,
            name: true,
            categorySubCategory: {
                select: {
                    subCategory: {
                        select: {
                            id: true,
                            name: true,
                            showInMenu: true,
                            isActive: true
                        }

                    }
                }
            }
        }
    });
}
async function findByName(name: string){
    return prisma.category.findFirst({
        where: {
            name: name
        }
    });
}
async function findById(id: number){
    return prisma.category.findFirst({
        where: {
            id: id
        }
    });
}
async function createCategory({ name }: newCategoryBody){
    return prisma.category.create({
        data: {
            name: name
        }
    });
}
async function putCategory({ name, id }: putCategoryBody){
    return prisma.category.update({
        where: {
            id: id
        },
        data:{
            name: name
        }
    });
}
async function disableCategory(id : number){
    return prisma.category.update({
        where: {
            id: id
        },
        data:{
            isActive: false
        }
    });
}
async function verifyLink({ subCategoryId, categoryId }: { subCategoryId: number, categoryId: number }){
    return prisma.categorySubCategory.findFirst({
        where: {
            categoryId,
            subCategoryId
        }
    });
}
async function handleLinkSubCategory({ subCategoryId, categoryId }: { subCategoryId: number, categoryId: number }){
    return prisma.categorySubCategory.create({
        data: {
            categoryId,
            subCategoryId
        }
    });
}
async function handleUnLinkSubCategory(linkId: number){
    return prisma.categorySubCategory.delete({
        where: {
            id: linkId
        }
    });
}

const categoryRepository = {
    findAllActive,
    findByName,
    findById,
    createCategory,
    putCategory,
    disableCategory,
    verifyLink,
    handleLinkSubCategory,
    handleUnLinkSubCategory
}

export default categoryRepository