import { createCategory, disableCategory, getAllCategories, getAllCategoriesData, handleSubCategoryLink, putCategory } from '@/controllers/category-controller'
import { authenticateToken } from '@/middlewares/auth/authentication-middlerare'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const categoryRouter = Router()

categoryRouter
    
    .get("", getAllCategories)

    .all("/*", authenticateAdminToken)
    .get("/admin", getAllCategoriesData)
    .post("/admin", createCategory)
    .put("/admin", putCategory)
    .put("/admin/disable", disableCategory)
    .put("/admin/subcategorylink", handleSubCategoryLink)


export { categoryRouter }