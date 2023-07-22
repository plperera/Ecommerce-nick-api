import { prisma } from "@/config";
import { newHomeBannerBody } from "@/schemas/homePage/newHomeBannerSCHEMA";

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
const homePageRepository = {
    findAllIBannersData,
    findAllCategoriesHomeData,
    createBanner
}

export default homePageRepository