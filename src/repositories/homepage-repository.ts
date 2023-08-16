import { prisma } from "@/config";
import { newHomeBannerBody } from "@/schemas/homePage/newHomeBannerSCHEMA";
import { newHomeCategoryBody } from "@/schemas/homePage/newHomeCategorySCHEMA";
import { newProductBannerBody } from "@/schemas/homePage/newProductBannerSCHEMA";
import { putHomeBannerBody } from "@/schemas/homePage/putHomeBannerSCHEMA";
import { putHomeCategoryBody } from "@/schemas/homePage/putHomeCategorySCHEMA";
import { putProductBannerBody } from "@/schemas/homePage/putProductBannerSCHEMA";

async function findAllIBannersData(){
    return prisma.banner.findMany({
        select: {
            id: true,
            text: true,
            image: {
                select: {
                    imageUrl: true,
                }
            }          
        }
    });
}
async function findAllCategoriesHomeData(){
    return prisma.homeCategory.findMany({
        select: {
            id: true,   
            image: {
                select: {
                    imageUrl: true,
                }
            },
            category: {
                select: {
                    name: true,
                }
            }      
        }
    });
}
async function findAllProductBannerHomeData(){
    return prisma.homeProductBanner.findMany({
        select: {
            id: true,   
            image: {
                select: {
                    imageUrl: true,
                }
            },
            product: {
                select: {
                    name: true
                }
            }      
        }
    });
}
async function createProductBanner(body: newProductBannerBody){
    return prisma.homeProductBanner.create({
        data:{
            imageId: body.imageId,
            productId: body.productId
        }
    });
}
async function createBanner(body: newHomeBannerBody){
    return prisma.banner.create({
        data:{
            text: body.text,
            imageId: body.imageId
        }
    });
}
async function findBannerById(bannerId: number){
    return prisma.banner.findFirst({
        where: {
            id: bannerId
        }
    });
}
async function findProductBannerHomeById(productBannerId: number){
    return prisma.homeProductBanner.findFirst({
        where: {
            id: productBannerId
        }
    });
}
async function deleteBannerById(bannerId: number){
    return prisma.banner.delete({
        where: {
            id: bannerId
        }
    });
}
async function updateBanner(body: putHomeBannerBody){
    return prisma.banner.update({
        where: {
            id: body.bannerId
        },
        data: {
            imageId: body.imageId,
            text: body.text
        }
    });
}
async function createHomeCategory(body: newHomeCategoryBody){
    return prisma.homeCategory.create({
        data:{
            imageId: body.imageId,
            categoryId: body.categoryId
        }
    });
}
async function findHomeCategoryById(homeCategoryId: number){
    return prisma.homeCategory.findFirst({
        where: {
            id: homeCategoryId
        }
    });
}
async function deleteHomeCategoryById(homeCategoryId: number){
    return prisma.homeCategory.delete({
        where: {
            id: homeCategoryId
        }
    });
}
async function deleteProductBannerById(productBannerId: number){
    return prisma.homeProductBanner.delete({
        where: {
            id: productBannerId
        }
    });
}
async function updateHomeCategory(body: putHomeCategoryBody){
    return prisma.homeCategory.update({
        where: {
            id: body.homeCategoryId
        },
        data: {
            imageId: body.imageId,
            categoryId: body.categoryId,
        }
    });
}
async function updateProductBanner(body: putProductBannerBody){
    return prisma.homeProductBanner.update({
        where: {
            id: body.productBannerId
        },
        data: {
            productId: body.productId,
            imageId: body.imageId,
        }
    });
}


const homePageRepository = {
    findAllIBannersData,
    findAllCategoriesHomeData,
    createBanner,
    findBannerById,
    deleteBannerById,
    updateBanner,
    createHomeCategory,
    findHomeCategoryById,
    findProductBannerHomeById,
    deleteHomeCategoryById,
    updateHomeCategory,
    findAllProductBannerHomeData,
    createProductBanner,
    deleteProductBannerById,
    updateProductBanner
}
export default homePageRepository