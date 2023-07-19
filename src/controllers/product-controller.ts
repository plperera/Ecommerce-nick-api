import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares/auth/authentication-middlerare";
import { AuthenticatedAdminRequest } from "@/middlewares/auth/authenticationAdmin-middlerare";
import productService from "@/services/product-service";
import { getProductByCategorySCHEMA } from "@/schemas/product/getProductByCategorySCHEMA";
import { getUniqueProductSCHEMA } from "@/schemas/product/getUniqueProductSCHEMA";
import { createProductSCHEMA } from "@/schemas/product/createProductSCHEMA";
import { putProductSCHEMA } from "@/schemas/product/putProductSCHEMA";
import { disableProductSCHEMA } from "@/schemas/product/deleteProductSCHEMA";
import { getByNameUniqueProductSCHEMA } from "@/schemas/product/getByNameUniqueProductSCHEMA";

export async function getAllProducts(req: AuthenticatedRequest, res: Response){
    try {        

        const AllProducts = await productService.getAllProductsData()

        return res.send(AllProducts).status(httpStatus.OK)
        

    } catch (error) {
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        if (error.name === "ForbiddenError") {
            return res.status(httpStatus.FORBIDDEN).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function getAllProductsByCategoryId(req: AuthenticatedRequest, res: Response){
    try {        

        const { categoryId } = req.params
        
        const isValid = getProductByCategorySCHEMA.validate( {categoryId: Number(categoryId)}, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const AllProducts = await productService.getAllProductsDataByCategoryId( Number(categoryId) )

        return res.send(AllProducts).status(httpStatus.OK)
        

    } catch (error) {
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        if (error.name === "ForbiddenError") {
            return res.status(httpStatus.FORBIDDEN).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function getUniqueProductsByName(req: AuthenticatedRequest, res: Response){
    try {        
        const { productName } = req.params

        const isValid = getByNameUniqueProductSCHEMA.validate( {productName: productName}, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const Product = await productService.getUniqueProductDataByName( productName )

        return res.send(Product).status(httpStatus.OK)
        

    } catch (error) {
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if (error.name === "BadRequestError") {
            console.log(error)
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        if (error.name === "ForbiddenError") {
            return res.status(httpStatus.FORBIDDEN).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function getUniqueProductsById(req: AuthenticatedRequest, res: Response){
    try {        

        const { productId } = req.params

        const isValid = getUniqueProductSCHEMA.validate( {productId: Number(productId)}, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const Product = await productService.getUniqueProductDataById( Number(productId) )

        return res.send(Product).status(httpStatus.OK)
        

    } catch (error) {
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        if (error.name === "ForbiddenError") {
            return res.status(httpStatus.FORBIDDEN).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function createProduct(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const isValid = createProductSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        const { name } = req.body
        await productService.verifyCategoryAndImageArrays(req.body)
        await productService.verifyName(name)

        await productService.createProduct(req.body)

        return res.sendStatus(httpStatus.CREATED)
        

    } catch (error) {
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        if (error.name === "ForbiddenError") {
            return res.status(httpStatus.FORBIDDEN).send(error);
        }
        console.log(error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function putProduct(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const isValid = putProductSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { name, id } = req.body

        await productService.verifyCategoryAndImageArrays(req.body)
        await productService.verifyNameBelongsId({name, id})

        await productService.putProduct(req.body)

        return res.sendStatus(httpStatus.OK)
        

    } catch (error) {
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        if (error.name === "ForbiddenError") {
            return res.status(httpStatus.FORBIDDEN).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function disableProduct(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const isValid = disableProductSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { id } = req.body

        const result = await productService.getUniqueProductDataById( id )

        if ( !result ){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        await productService.disableProduct(id)

        return res.sendStatus(httpStatus.OK)
        

    } catch (error) {
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        if (error.name === "ForbiddenError") {
            return res.status(httpStatus.FORBIDDEN).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}