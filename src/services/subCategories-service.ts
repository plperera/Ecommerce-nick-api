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


const subCategoryService = {
    getAllSubCategoriesData
}

export default subCategoryService