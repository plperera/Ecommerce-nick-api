import { NewFavoriteProduct, RemoveFavoriteProduct, getAllFavorites } from '@/controllers/favorite-controller'
import { authenticateToken } from '@/middlewares/auth/authentication-middlerare'
import { Router } from 'express'

const favoriteRouter = Router()

favoriteRouter
    
    .all("/*", authenticateToken)
    
    .get("", getAllFavorites)
    .post("", NewFavoriteProduct)
    .delete("", RemoveFavoriteProduct)
   

export { favoriteRouter }