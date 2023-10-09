import { badRequestError } from "@/errors/bad-request-erros";
import { conflictError } from "@/errors/conflict-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import categoryRepository from "@/repositories/category-repository";
import favoriteRepository from "@/repositories/favorite-repository";
import imageRepository from "@/repositories/image-repository";
import productRepository, { productAdminBodyResponse, productBodyResponse, productCartBodyResponse, productUniqueBodyResponse } from "@/repositories/product-repository";
import { createProductBody, imagesArray } from "@/schemas/product/createProductSCHEMA";
import { putProductBody } from "@/schemas/product/putProductSCHEMA";

function FormatProducts(productsArray: productBodyResponse){

    const result = productsArray.map(product => ({
        productId: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        categories: product.productSubCategory.map(e => ({
          categoryId: e.subCategory.id,
          name: e.subCategory.name
        })),
        images: product.productImage.map(e => ({
          mainImage: e.mainImage,
          imageUrl: e.image.imageUrl
        })),
        tecnicDetails: product.tecnicDetails.map(e => ({
            topic: e.topic,
            topicDetail: e.topicDetail
        }))
    }));

    return result
}
async function getAllFavoritesProductsDataByUserId(userId: number){

    const result = await favoriteRepository.findAllFavoritesProductsData(userId)

    const formattedProducts = FormatProducts(result.map(favorite => favorite.product))  

    return formattedProducts
}
async function verifyProductId(productId: number){
    const result = await productRepository.findProductById(productId)

    if (!result) {
        throw notFoundError("O Produto não existe")
    }

    return
}
async function verifyHasFavoriteProductId({userId, productId}:{userId: number, productId: number}){
    const result = await favoriteRepository.findFavoriteByProductIdAndUserId({userId, productId})

    if (result) {
        throw conflictError("O Produto ja foi favoritado pelo usuario")
    }

    return 
}
async function verifyNotHasFavoriteProductId({userId, productId}:{userId: number, productId: number}){
    const result = await favoriteRepository.findFavoriteByProductIdAndUserId({userId, productId})

    if (!result) {
        throw notFoundError("O Produto não foi encontrado nos favoritos do usuario")
    }

    return result
}
async function createNewFavoriteProduct({userId, productId}:{userId: number, productId: number}){
    await favoriteRepository.createNewFavorite({userId, productId})
    return
}
async function removeFavoriteProduct(favoriteId: number){
    await favoriteRepository.removeFavoriteProduct(favoriteId)
    return
}

const favoriteService = {
    getAllFavoritesProductsDataByUserId,
    verifyProductId,
    verifyHasFavoriteProductId,
    createNewFavoriteProduct,
    verifyNotHasFavoriteProductId,
    removeFavoriteProduct
}

export default favoriteService