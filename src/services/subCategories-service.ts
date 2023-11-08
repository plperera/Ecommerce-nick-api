import { acceptedError } from "@/errors/accepted-error";
import { conflictError } from "@/errors/conflict-error";
import { notFoundError } from "@/errors/not-found-error";
import subCategoryRepository from "@/repositories/subCategory-repository";

async function getAllSubCategoriesData(){

    const result = await subCategoryRepository.findAllSubCategoriesData()

    const formatedResult = result.map(subc => {
        return {
            subCategoryId: subc.id,
            subCategoryName: subc.name,
            subCategoryIsActive: subc.isActive,
            subCategoryShowInMenu: subc.showInMenu,
            subCategoryCreatedAt: subc.createdAt,
            subCategoryUpdatedAt: subc.updatedAt,
            products: subc.productSubCategory.map(prodSubc => {
                return {
                    productId: prodSubc.product.id,
                    productName: prodSubc.product.name
                }
            }),
            mainCategory: {
                categoryId: subc?.categorySubCategory[0]?.category?.id,
                categoryName: subc?.categorySubCategory[0]?.category?.name,
                categoryIsActive: subc?.categorySubCategory[0]?.category?.isActive,
                categoryShowInMenu: subc?.categorySubCategory[0]?.category?.showInMenu
            }
        }
    })
    return formatedResult
}
async function verifySubCategoryName({subCategoryName, mustHave}:{subCategoryName: string, mustHave: boolean}){
    const hasSubCategory = await subCategoryRepository.findSubCategoryByName(subCategoryName)

    if( hasSubCategory && !mustHave){
        throw conflictError("Nome de SubCategoria já cadastrada")
    }

    if( !hasSubCategory && mustHave){
        throw notFoundError("Nome de SubCategoria não encontrada")
    }

    return hasSubCategory
}
async function createSubCategory(subCategoryName: string){
    const hasSubCategory = await subCategoryRepository.createSubCategory(subCategoryName)
    return hasSubCategory
}
async function verifySubCategoryId(subCategoryId: number){
    const hasSubCategory = await subCategoryRepository.findSubCategoryById(subCategoryId)

    if(!hasSubCategory){
        throw notFoundError("SubCategoria não encontrada")
    }

    return hasSubCategory
}
async function updateSubCategory({ subCategoryId, newSubCategoryName }: { subCategoryId: number, newSubCategoryName: string }){
    const response = await subCategoryRepository.updateSubCategory({subCategoryId, newSubCategoryName})
    return response
}
async function changeStatusSubCategory({ subCategoryId, newStatus }: { subCategoryId: number, newStatus: boolean }){
    const response = await subCategoryRepository.changeStatusSubCategory({subCategoryId, newStatus})
    return response
}
async function handleLinkProduct({ subCategoryId, productId }: { subCategoryId: number, productId: number }){
    const response = await subCategoryRepository.handleLinkProduct({subCategoryId, productId})
    return response
}
async function handleUnLinkProduct({ linkId }: { linkId: number }){
    const response = await subCategoryRepository.handleUnLinkProduct(linkId)
    return response
}
async function verifyLink({ subCategoryId, productId }: { subCategoryId: number, productId: number }){
    const hasLink = await subCategoryRepository.findLink({subCategoryId, productId})
    // if (hasLink){
    //     throw acceptedError("Produto ja linkado com essa SubCategoria")
    // }
    return hasLink
}



const subCategoryService = {
    getAllSubCategoriesData,
    verifySubCategoryName,
    createSubCategory,
    verifySubCategoryId,
    updateSubCategory,
    changeStatusSubCategory,
    handleLinkProduct,
    verifyLink,
    handleUnLinkProduct
}

export default subCategoryService