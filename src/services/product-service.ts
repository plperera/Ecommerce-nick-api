import { badRequestError } from "@/errors/bad-request-erros";
import { conflictError } from "@/errors/conflict-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import categoryRepository from "@/repositories/category-repository";
import imageRepository from "@/repositories/image-repository";
import productRepository, { productBodyResponse, productUniqueBodyResponse } from "@/repositories/product-repository";
import { createProductBody, imagesArray } from "@/schemas/product/createProductSCHEMA";

function FormatProducts(productsArray: productBodyResponse){

    const result = productsArray.map(product => ({
        productId: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        categories: product.productCategory.map(e => ({
          categoryId: e.category.id,
          name: e.category.name
        })),
        images: product.productImage.map(e => ({
          mainImage: e.mainImage,
          imageUrl: e.image.imageUrl
        }))
    }));

    return result
}
function justOneTrue(images: { mainImage: boolean, imageId: number }[]) {

    let hasMain = false

    for (let i = 0; i < images.length; i++){
        if (hasMain){
            images[i].mainImage = false
        } else if (images[i].mainImage && !hasMain) {
            hasMain = true
        }
    }
    if(!hasMain){
        images[0].mainImage = true
    }
    return images
}
async function getAllProductsData(){

    const result = await productRepository.findAllActive()

    const formattedProducts = FormatProducts(result)  

    return formattedProducts
}
async function getAllProductsDataByCategoryId( categoryId: number ){

    const result = await productRepository.findAllProductsActiveByCategoryId(categoryId)

    const formattedProducts = FormatProducts(result)  

    return formattedProducts
}
async function getUniqueProductDataById( productId: number ) {

    const result = await productRepository.findProductById( productId )

    if (!result) {
        throw notFoundError("Produto não encontrado") 
    } 

    const formattedProduct = {
        productId: result.id,
        name: result.name,
        description: result.description,
        price: result.price,
        categories: result.productCategory.map(e => ({
            categoryId: e.category.id,
            name: e.category.name
        })),
        images: result.productImage.map(e => ({
            mainImage: e.mainImage,
            imageUrl: e.image.imageUrl
        }))
    }; 
    
    return formattedProduct
    
}
async function verifyBody( body: createProductBody ) {

    const { categories, images } = body
    
    categories.map( async e => {
        const result = await categoryRepository.findById( e.categoryId )
        if (!result) {
            throw badRequestError("Categoria inexistente")
        }
    })

    images.map( async e => {
        const result = await imageRepository.findById( e.imageId )
        if (!result) {
            throw badRequestError("Imagem não encontrada")
        }
    })

    const hasName = await productRepository.findByName(body.name)

    if( hasName ){
        throw conflictError("Nome ja cadastrado")
    }

    return

}
async function createProduct( body: createProductBody ) {

    const productData = await productRepository.createProduct({ 
        name: body.name, 
        description: body.description, 
        price: body.price,
        stock: body.stock
    })

    const image = justOneTrue(body.images)

    const newCategoryArray = body.categories.map(e => ({
        categoryId: e.categoryId,
        productId: productData.id
    }));

    const newImagesArray = image.map(e => ({
        imageId: e.imageId,
        mainImage: e.mainImage,
        productId: productData.id
    }));

    await productRepository.createManyCategoriesProduct(newCategoryArray)
    
    await productRepository.createManyImagesProduct(newImagesArray)

}
const productService = {
    getAllProductsData,
    getAllProductsDataByCategoryId,
    getUniqueProductDataById,
    verifyBody,
    createProduct
}

export default productService