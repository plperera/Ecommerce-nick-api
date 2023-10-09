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
async function verifyName(name: string){
    const result = await categoryRepository.findByName(name)

    if ( result ){
        throw conflictError("Nome de categoria já existente")
    }

    return 
}
async function verifyNameBelongsId ({ name, id }: Omit<putShippingBody, "price">){
    const result = await categoryRepository.findByName(name)

    if ( result && result?.id !== id){
        throw conflictError("Nome de categoria já atrelada a outro id")
    }
    return 
}
async function verifyValidId(id: number){
    const result = await categoryRepository.findById(id)

    if ( !result ){
        throw notFoundError("Não existe categoria com o ID passado")
    }
    return 
}
async function createCategory({ name }: newCategoryBody){
    await categoryRepository.createCategory({ name })
    return 
}
async function putCategory({ name, id }: putCategoryBody){
    await categoryRepository.putCategory({ name, id })
    return 
}
async function disableCategory(id: number){
    await categoryRepository.disableCategory( id )
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
    handleUnLinkSubCategory
}

export default categoryService