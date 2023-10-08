import { prisma } from "@/config";
import { newCategoryBody } from "@/schemas/category/newCategorySCHEMA";
import { putCategoryBody } from "@/schemas/category/putCategorySCHEMA";

async function findAllSubCategoriesData(){
    return prisma.subCategory.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            isActive: true,
            showInMenu: true,
            categorySubCategory: {
                select: {
                    category: {
                        select: {
                          id: true,
                          name: true,
                          createdAt: true,
                          updatedAt: true,
                          isActive: true,
                          showInMenu: true,
                        },
                    }
                }
            },
        }
    });
}


const subCategoryRepository = {
    findAllSubCategoriesData,

}

export default subCategoryRepository