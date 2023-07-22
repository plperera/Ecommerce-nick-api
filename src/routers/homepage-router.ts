
import { createCategoryHome, createNewBanner, deleteBanner, getAllBanners, getAllCategoriesHome, updateBanner } from '@/controllers/homepage-controller'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const homePageRouter = Router()

homePageRouter
    
    .get("/banners", getAllBanners)
    .get("/category", getAllCategoriesHome)

    
    .all("/*", authenticateAdminToken)

    .post("/banner/admin", createNewBanner)
    .delete("/banner/admin", deleteBanner)
    .put("/banner/admin", updateBanner)
    
    .post("/category/admin", createCategoryHome)
    /*
    .delete("/category/admin", deleteCategory)
    .put("/category/admin", updateCategory)
    */

export { homePageRouter }