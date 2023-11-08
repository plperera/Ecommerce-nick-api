import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares/auth/authentication-middlerare";
import { AuthenticatedAdminRequest } from "@/middlewares/auth/authenticationAdmin-middlerare";
import productService from "@/services/product-service";
import { getProductBySubCategorySCHEMA } from "@/schemas/product/getProductBySubCategorySCHEMA";
import { getUniqueProductSCHEMA } from "@/schemas/product/getUniqueProductSCHEMA";
import { createProductSCHEMA } from "@/schemas/product/createProductSCHEMA";
import { putProductSCHEMA } from "@/schemas/product/putProductSCHEMA";
import { disableProductSCHEMA } from "@/schemas/product/deleteProductSCHEMA";
import { getByNameUniqueProductSCHEMA } from "@/schemas/product/getByNameUniqueProductSCHEMA";
import { linkProductImageSCHEMA } from "@/schemas/product/linkProductImageSCHEMA";
import imageService from "@/services/image-service";

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
export async function getAllProductWithAllData(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const AllProducts = await productService.getAllProductsDataWithAllData()

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
export async function getAllProductsById(req: Request, res: Response){
    try {    

        const stringArray: string[] = JSON.parse(decodeURIComponent(req.params.productIdArray));
        const productIdArray: {productId: number}[] = stringArray.map(e => ({productId: Number(e)}))

        for (let i = 0; i < productIdArray.length; i++) {

            if(typeof productIdArray[i].productId !== 'number' || !productIdArray[i]){
                console.log(productIdArray[i])
                return res.sendStatus(httpStatus.BAD_REQUEST)
            }
            
        }
                
        const AllProductsById = await productService.getAllProductsDataById(productIdArray)

        return res.send(AllProductsById).status(httpStatus.OK)
        

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
export async function getAllProductsBySubCategoryId(req: AuthenticatedRequest, res: Response){
    try {        

        const { subCategoryId } = req.params
        
        const isValid = getProductBySubCategorySCHEMA.validate( {subCategoryId: Number(subCategoryId)}, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const AllProducts = await productService.getAllProductsDataBySubCategoryId( Number(subCategoryId) )

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
        await productService.verifySubCategoryAndImageArrays(req.body)
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
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { name, id } = req.body

        await productService.verifySubCategoryAndImageArrays(req.body)
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
export async function activeProduct(req: AuthenticatedAdminRequest, res: Response){
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

        await productService.enableProduct(id)

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
export async function handleProductImageLink(req: AuthenticatedAdminRequest, res: Response){
    try {        

        const isValid = linkProductImageSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }   

        const { productId, imageId } = req.body

        await productService.verifyProductId(productId)
        await imageService.verifyImageId(imageId)

        const hasLink = await imageService.verifyLink({ productId, imageId })

        if (hasLink) {
            await imageService.handleUnLinkSubCategory(hasLink?.id)
        } else {
            await imageService.handleLinkSubCategory({ productId, imageId })
        }

        return res.sendStatus(httpStatus.OK)
        

    } catch (error) {
        if(error.name === "AcceptedError") {
            return res.sendStatus(httpStatus.ACCEPTED);
        }
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