import { createHomeCategory, createNewBanner, deleteBanner, deleteHomeCategory, getAllBanners, getAllCategoriesHome, updateBanner, updateHomeCategory } from '@/controllers/homepage-controller'
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
    
    .post("/category/admin", createHomeCategory)
    .delete("/category/admin", deleteHomeCategory)
    .put("/category/admin", updateHomeCategory)
   

export { homePageRouter }