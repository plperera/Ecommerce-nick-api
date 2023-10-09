import { createSubCategory, getAllSubCategoriesData, handleProductLink, handleStatusSubCategory, putSubCategory } from '@/controllers/sub-category-controller'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const subCategoryRouter = Router()

subCategoryRouter
    
    // .get("", getAllSubCategoriesData)

    .all("/*", authenticateAdminToken)

    .get("/admin", getAllSubCategoriesData)
    .post("/admin", createSubCategory)
    .put("/admin", putSubCategory)
    .put("/admin/status", handleStatusSubCategory)
    .put("/admin/productlink", handleProductLink)

export { subCategoryRouter }