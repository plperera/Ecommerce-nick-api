import { createHomeCategory, createNewBanner, deleteBanner, deleteHomeCategory, getAllBanners, getAllCategoriesHome, updateBanner, updateHomeCategory } from '@/controllers/homepage-controller'
import { authenticateToken } from '@/middlewares/auth/authentication-middlerare'
import { Router } from 'express'

const favoriteRouter = Router()

favoriteRouter
    
    .all("/*", authenticateToken)
    /*
    .get("", getAllFavorite)
    .post("", createFavorite)
    .delete("", deleteFavorite)
    */

export { favoriteRouter }