import { badRequestError } from "@/errors/bad-request-erros";
import { conflictError } from "@/errors/conflict-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import categoryRepository from "@/repositories/category-repository";
import homePageRepository from "@/repositories/homepage-repository";
import imageRepository from "@/repositories/image-repository";
import { newHomeBannerBody } from "@/schemas/homePage/newHomeBannerSCHEMA";
import { newHomeCategoryBody } from "@/schemas/homePage/newHomeCategorySCHEMA";
import { putHomeBannerBody } from "@/schemas/homePage/putHomeBannerSCHEMA";

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
async function verifyBannerId(bannerId: number){

    const result = await homePageRepository.findBannerById(bannerId)

    if(!result){
        throw badRequestError("Banner não encontrado")
    }
   
    return 
}
async function deleteBanner(bannerId: number){

    await homePageRepository.deleteBannerById(bannerId)
    return 
}
async function updateBanner(body: putHomeBannerBody){
    await homePageRepository.updateBanner(body)
    return 
}
async function verifyCategory(categoryId: number){

    const result = await categoryRepository.findById(categoryId)

    if(!result){
        throw badRequestError("Categoria não encontrada")
    }
   
    return 
}
async function createHomeCategory(body: newHomeCategoryBody){
    await homePageRepository.createHomeCategory(body)   
    return 
}

const homePageService = {
    getAllIBannersData,
    getAllCategoriesHomeData,
    verifyImage,
    createBanner,
    verifyBannerId,
    deleteBanner,
    updateBanner,
    verifyCategory,
    createHomeCategory
}
export default homePageService