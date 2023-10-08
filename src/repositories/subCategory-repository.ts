import { prisma } from "@/config";
import { newCategoryBody } from "@/schemas/category/newCategorySCHEMA";
import { putCategoryBody } from "@/schemas/category/putCategorySCHEMA";

async function findAllSubCategoriesData(){
    return prisma.subCategory.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            isActive: true,
            showInMenu: true,
            categorySubCategory: {
                select: {
                    category: {
                        select: {
                          id: true,
                          name: true,
                          createdAt: true,
                          updatedAt: true,
                          isActive: true,
                          showInMenu: true,
                        },
                    }
                }
            },
        }
    });
}
async function findSubCategoryByName(name: string){
    return prisma.subCategory.findUnique({
        where: {
            name: name
        }
    });
}
async function createSubCategory(name: string){
    return prisma.subCategory.create({
        data: {
            name: name,
        }
    });
}
async function findSubCategoryById(subCategoryId: number){
    return prisma.subCategory.findUnique({
        where: {
            id: subCategoryId
        }
    });
}
async function updateSubCategory({ subCategoryId, newSubCategoryName }: { subCategoryId: number, newSubCategoryName: string }){
    return prisma.subCategory.update({
        where: {
            id: subCategoryId
        },
        data: {
            name: newSubCategoryName
        }
    });
}
async function changeStatusSubCategory({ subCategoryId, newStatus }: { subCategoryId: number, newStatus: boolean }){
    return prisma.subCategory.update({
        where: {
            id: subCategoryId
        },
        data: {
            isActive: newStatus
        }
    });
}
async function handleLinkProduct({ subCategoryId, productId }: { subCategoryId: number, productId: number }){
    return prisma.productSubCategory.create({
        data: {
            subCategoryId: subCategoryId,
            productId: productId
        }
    });
}
async function handleUnLinkProduct(linkId: number){
    return prisma.productSubCategory.delete({
        where: {
            id: linkId
        }
    });
}
async function findLink({ subCategoryId, productId }: { subCategoryId: number, productId: number }){
    return prisma.productSubCategory.findFirst({
        where: {
            subCategoryId: subCategoryId,
            productId: productId
        }
    });
}

const subCategoryRepository = {
    findAllSubCategoriesData,
    findSubCategoryByName,
    createSubCategory,
    findSubCategoryById,
    updateSubCategory,
    changeStatusSubCategory,
    handleLinkProduct,
    findLink,
    handleUnLinkProduct
}

export default subCategoryRepository