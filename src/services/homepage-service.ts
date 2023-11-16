import { badRequestError } from "@/errors/bad-request-erros";
import { conflictError } from "@/errors/conflict-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import categoryRepository from "@/repositories/category-repository";
import homePageRepository from "@/repositories/homepage-repository";
import imageRepository from "@/repositories/image-repository";
import productRepository from "@/repositories/product-repository";
import subCategoryRepository from "@/repositories/subCategory-repository";
import { newHomeBannerBody } from "@/schemas/homePage/newHomeBannerSCHEMA";
import { newHomeCategoryBody } from "@/schemas/homePage/newHomeCategorySCHEMA";
import { newProductBannerBody } from "@/schemas/homePage/newProductBannerSCHEMA";
import { putHomeBannerBody } from "@/schemas/homePage/putHomeBannerSCHEMA";
import { putHomeCategoryBody } from "@/schemas/homePage/putHomeCategorySCHEMA";
import { putProductBannerBody } from "@/schemas/homePage/putProductBannerSCHEMA";

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
            categoryCardId: e.id, 
            imageUrl: e.image.imageUrl, 
            subCategoryName: e.subCategory.name
        }
    })
    
    return formatedResult
}
async function getAllCardCategoryData(){
    const result = await homePageRepository.findAllCategoryCardData()
    
    const formatedResult = result.map(e => {
        return {
            categoryCardId: e.id, 
            imageUrl: e.image.imageUrl, 
            subCategoryName: e.subCategory.name,
            subCategoryId: e.subCategory.id,
            imageId: e.image.id
        }
    })
    
    return formatedResult
}
async function getAllProductBannerData(){
    const result = await homePageRepository.findAllProductBannerHomeData()
    
    const formatedResult = result.map(e => {
        return {
            productBannerId: e.id, 
            imageUrl: e.image.imageUrl, 
            productName: e.product.name, 
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
async function verifyProductId(productId: number){

    const result = await productRepository.findProductById(productId)

    if(!result){
        throw badRequestError("Produto não encontrado")
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
async function verifySubCategory(subCategoryId: number){

    const result = await subCategoryRepository.findSubCategoryById(subCategoryId)

    if(!result){
        throw badRequestError("SubCategoria não encontrada")
    }
   
    return 
}
async function createHomeCategory(body: newHomeCategoryBody){
    await homePageRepository.createHomeCategory(body)   
    return 
}
async function createProductBanner(body: newProductBannerBody){
    await homePageRepository.createProductBanner(body)   
    return 
}
async function verifyProductBannerId(productBannerId: number){

    const result = await homePageRepository.findProductBannerHomeById(productBannerId)

    if(!result){
        throw badRequestError("Produto (card) não encontrado")
    }
   
    return 
}
async function verifyHomeCategoryId(homeCategoryId: number){

    const result = await homePageRepository.findHomeCategoryById(homeCategoryId)

    if(!result){
        throw badRequestError("Categoria (card) não encontrada")
    }
   
    return 
}
async function deleteHomeCategory(homeCategoryId: number){
    await homePageRepository.deleteHomeCategoryById(homeCategoryId)
    return 
}
async function updateHomeCategory(body: putHomeCategoryBody){
    await homePageRepository.updateHomeCategory(body)
    return 
}
async function deleteProductBanner(productBannerId: number){
    await homePageRepository.deleteProductBannerById(productBannerId)
    return 
}
async function updateProductBanner(body: putProductBannerBody){
    await homePageRepository.updateProductBanner(body)
    return 
}


const homePageService = {
    getAllIBannersData,
    getAllCategoriesHomeData,
    getAllProductBannerData,
    verifyImage,
    verifyProductId,
    createBanner,
    verifyBannerId,
    deleteBanner,
    updateBanner,
    verifySubCategory,
    createHomeCategory,
    createProductBanner,
    verifyHomeCategoryId,
    verifyProductBannerId,
    deleteHomeCategory,
    updateHomeCategory,
    deleteProductBanner,
    updateProductBanner,
    getAllCardCategoryData
}
export default homePageService