import { prisma } from "@/config";
import { newHomeBannerBody } from "@/schemas/homePage/newHomeBannerSCHEMA";
import { newHomeCategoryBody } from "@/schemas/homePage/newHomeCategorySCHEMA";
import { putHomeBannerBody } from "@/schemas/homePage/putHomeBannerSCHEMA";
import { putHomeCategoryBody } from "@/schemas/homePage/putHomeCategorySCHEMA";

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
            subTitle: true,   
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
            subTitle: body.subTitle,
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
async function updateHomeCategory(body: putHomeCategoryBody){
    return prisma.homeCategory.update({
        where: {
            id: body.homeCategoryId
        },
        data: {
            imageId: body.imageId,
            categoryId: body.categoryId,
            subTitle: body.subTitle
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
    deleteHomeCategoryById,
    updateHomeCategory
}
export default homePageRepository