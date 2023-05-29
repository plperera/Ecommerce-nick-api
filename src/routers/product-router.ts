import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const productRouter = Router()

productRouter
    .all("/*", authenticateToken)
    .post("/new", newProduct)
    .get("", getAllProducts)

export { productRouter }