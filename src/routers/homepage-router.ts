import { createHomeCategory, createNewBanner, createProductBanner, deleteBanner, deleteHomeCategory, deleteProductBanner, getAllBanners, getAllCategoriesHome, getAllProductBanner, updateBanner, updateHomeCategory, updateProductBanner } from '@/controllers/homepage-controller'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const homePageRouter = Router()

homePageRouter
    
    .get("/banners", getAllBanners)
    .get("/category", getAllCategoriesHome)
    .get("/productbanner", getAllProductBanner)

    .all("/*", authenticateAdminToken)

    .post("/banner/admin", createNewBanner)
    .delete("/banner/admin", deleteBanner)
    .put("/banner/admin", updateBanner)
    
    .post("/category/admin", createHomeCategory)
    .delete("/category/admin", deleteHomeCategory)
    .put("/category/admin", updateHomeCategory)

    .post("/productbanner/admin", createProductBanner)
    .delete("/productbanner/admin", deleteProductBanner)
    .put("/productbanner/admin", updateProductBanner)
   

export { homePageRouter }