import { createHomeCategory, createNewBanner, createProductBanner, deleteBanner, deleteHomeCategory, deleteProductBanner, getAllBanners, getAllCategoriesHome, getAllCategoryCardData, getAllProductBanner, updateBanner, updateHomeCategory, updateProductBanner } from '@/controllers/homepage-controller'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const homePageRouter = Router()

homePageRouter
    
    .get("/banners", getAllBanners)
    .get("/subcategory", getAllCategoriesHome)
    .get("/productbanner", getAllProductBanner)

    .all("/*", authenticateAdminToken)

    .post("/banner/admin", createNewBanner)
    .delete("/banner/admin", deleteBanner)
    .put("/banner/admin", updateBanner)
    
    .get("/subcategory/admin", getAllCategoryCardData)
    .post("/subcategory/admin", createHomeCategory)
    .delete("/subcategory/admin", deleteHomeCategory)
    .put("/subcategory/admin", updateHomeCategory)

    .post("/productbanner/admin", createProductBanner)
    .delete("/productbanner/admin", deleteProductBanner)
    .put("/productbanner/admin", updateProductBanner)
   

export { homePageRouter }