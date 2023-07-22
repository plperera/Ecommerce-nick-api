import { badRequestError } from "@/errors/bad-request-erros";
import { conflictError } from "@/errors/conflict-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import homePageRepository from "@/repositories/homepage-repository";
import imageRepository from "@/repositories/image-repository";
import { newHomeBannerBody } from "@/schemas/homePage/newHomeBannerSCHEMA";

async function getAllIBannersData(){
    const result = await homePageRepository.findAllIBannersData()
    const formatedResult = result.map(e => {
        return {
            bannerId: e.id, 
            text: e.text, 
            imageUrl: e.image.imageUrl, 
        }
    })
    return formatedResult
}
async function getAllCategoriesHomeData(){
    const result = await homePageRepository.findAllCategoriesHomeData()
    
    const formatedResult = result.map(e => {
        return {
            title: e.category.name, 
            subTitle: e.subTitle, 
            imageUrl: e.image.imageUrl, 
        }
    })
    
    return formatedResult
}
async function verifyImage(imageId: number){

    const result = await imageRepository.findById(imageId)

    if(!result){
        throw badRequestError("Imagem não encontrada")
    }
   
    return 
}
async function createBanner(body: newHomeBannerBody){
    await homePageRepository.createBanner(body)   
    return 
}
const homePageService = {
    getAllIBannersData,
    getAllCategoriesHomeData,
    verifyImage,
    createBanner
}

export default homePageService