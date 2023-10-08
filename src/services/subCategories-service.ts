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


const subCategoryService = {
    getAllSubCategoriesData,
    verifySubCategoryName,
    createSubCategory,
    verifySubCategoryId,
    updateSubCategory
}

export default subCategoryService