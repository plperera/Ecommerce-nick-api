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
async function findAllAdminData(){
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
                            isActive: true,
                            productSubCategory: {
                                select: {
                                    product: {
                                        select:{
                                            id: true,
                                            name: true,
                                            description: true,
                                            price: true,
                                            highPrice: true,
                                            stock: true,
                                            salesAmount: true,
                                            isActive: true,
                                            productImage:{
                                                select: {
                                                    image: {
                                                        select: {
                                                            id: true,
                                                            imageName: true,
                                                            imageUrl: true
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
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
async function createCategory({ categoryName }: newCategoryBody){
    return prisma.category.create({
        data: {
            name: categoryName
        }
    });
}
async function putCategory({ categoryName, categoryId }: putCategoryBody){
    return prisma.category.update({
        where: {
            id: categoryId
        },
        data:{
            name: categoryName
        }
    });
}
async function disableCategory(categoryId : number){
    return prisma.category.update({
        where: {
            id: categoryId
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
async function clearSubCategoryLink(subCategoryId: number){
    return prisma.categorySubCategory.deleteMany({
        where: {
            subCategoryId: subCategoryId
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
    handleUnLinkSubCategory,
    findAllAdminData,
    clearSubCategoryLink
}

export default categoryRepository