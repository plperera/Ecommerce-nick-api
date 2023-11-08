import { conflictError } from "@/errors/conflict-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import categoryRepository from "@/repositories/category-repository";
import { newCategoryBody } from "@/schemas/category/newCategorySCHEMA";
import { putCategoryBody } from "@/schemas/category/putCategorySCHEMA";
import { newShippingBody } from "@/schemas/shipping/newShippingSCHEMA";
import { putShippingBody } from "@/schemas/shipping/putShippingSCHEMA";

async function getAllCategoriesData(){
    const result = await categoryRepository.findAllActive()

    const formatedResult = result.map(e => {
        return {
            categoryId: e.id,
            categoryName: e.name,
            subCategories: e.categorySubCategory.map(s => {
                return {
                    subCategoryId: s.subCategory.id,
                    subCategoryName: s.subCategory.name,
                    subCategoryShowInMenu: s.subCategory.showInMenu,
                    subCategoryIsActived: s.subCategory.isActive
                }
            }).filter(sf => sf?.subCategoryIsActived)
        }
    })
    return formatedResult
}
async function getAllCategoriesAdminData(){
    const result = await categoryRepository.findAllAdminData()

    const formatedResult = result.map(e => {
        return {
            categoryId: e.id,
            categoryName: e.name,
            subCategories: e.categorySubCategory.map(csub => {
                return {
                    subCategoryId: csub.subCategory.id,
                    subCategoryName: csub.subCategory.name,
                    isActive: csub.subCategory.isActive,
                    products: csub.subCategory.productSubCategory.map(sp => {
                        return {
                            productId: sp.product.id,
                            productName: sp.product.name,
                            description: sp.product.description,
                            price: sp.product.price,
                            highPrice: sp.product.highPrice,
                            salesAmount: sp.product.salesAmount,
                            stock: sp.product.stock,
                            isActive: sp.product.isActive,
                            productImages: sp.product.productImage.map(pi => {
                                return {
                                    imageId: pi.image.id,
                                    imageName: pi.image.imageName,
                                    imageUrl: pi.image.imageUrl,
                                }
                            }),
                        }
                    }),
                }
            })
        }
    })
    return formatedResult
}
async function verifyName(name: string){
    const result = await categoryRepository.findByName(name)

    if ( result ){
        throw conflictError("Nome de categoria já existente")
    }

    return 
}
async function verifyNameBelongsId ({ categoryName, categoryId }: putCategoryBody){
    const result = await categoryRepository.findByName(categoryName)

    if ( result && result?.id !== categoryId){
        throw conflictError("Nome de categoria já atrelada a outro id")
    }
    return 
}
async function verifyValidId(categoryId: number){
    const result = await categoryRepository.findById(categoryId)

    if ( !result ){
        throw notFoundError("Não existe categoria com o ID passado")
    }
    return 
}
async function createCategory({ categoryName }: newCategoryBody){
    await categoryRepository.createCategory({ categoryName })
    return 
}
async function putCategory({ categoryName, categoryId }: putCategoryBody){
    await categoryRepository.putCategory({ categoryName, categoryId })
    return 
}
async function disableCategory(categoryId: number){
    await categoryRepository.disableCategory( categoryId )
    return 
}
async function verifyLink({ subCategoryId, categoryId }: { subCategoryId: number, categoryId: number }){
    const result = await categoryRepository.verifyLink({subCategoryId, categoryId})
    return result
}
async function handleLinkSubCategory({ subCategoryId, categoryId }: { subCategoryId: number, categoryId: number }){
    const result = await categoryRepository.handleLinkSubCategory({subCategoryId, categoryId})
    return result
}
async function handleUnLinkSubCategory({linkId}: {linkId: number}){
    const result = await categoryRepository.handleUnLinkSubCategory(linkId)
    return result
}
async function clearSubCategoryLink(subCategoryId: number){
    const result = await categoryRepository.clearSubCategoryLink(subCategoryId)
    return result
}

const categoryService = {
    getAllCategoriesData,
    verifyName,
    verifyNameBelongsId,
    verifyValidId,
    createCategory,
    putCategory,
    disableCategory,
    verifyLink,
    handleLinkSubCategory,
    handleUnLinkSubCategory,
    getAllCategoriesAdminData,
    clearSubCategoryLink
}

export default categoryService