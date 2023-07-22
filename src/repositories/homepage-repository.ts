import { prisma } from "@/config";
import { newHomeBannerBody } from "@/schemas/homePage/newHomeBannerSCHEMA";
import { putHomeBannerBody } from "@/schemas/homePage/putHomeBannerSCHEMA";

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

const homePageRepository = {
    findAllIBannersData,
    findAllCategoriesHomeData,
    createBanner,
    findBannerById,
    deleteBannerById,
    updateBanner
}
export default homePageRepository