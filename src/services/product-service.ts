import { badRequestError } from "@/errors/bad-request-erros";
import { conflictError } from "@/errors/conflict-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import categoryRepository from "@/repositories/category-repository";
import imageRepository from "@/repositories/image-repository";
import productRepository, { productBodyResponse, productUniqueBodyResponse } from "@/repositories/product-repository";
import { createProductBody, imagesArray } from "@/schemas/product/createProductSCHEMA";
import { putProductBody } from "@/schemas/product/putProductSCHEMA";

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
async function verifyCategoryAndImageArrays( body: createProductBody ) {

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

    return

}
async function verifyName( name: string ) {

    const hasName = await productRepository.findByName(name)

    if( hasName ){
        throw conflictError("Nome ja cadastrado")
    }

}
async function verifyNameBelongsId ({ name, id }: { name: string, id: number}){

    const result = await productRepository.findByName(name)

    if ( result && result?.id !== id){
        throw conflictError("Nome de método de entrega já atrelado a outro id")
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
async function putProduct( body: putProductBody ) {

    const image = justOneTrue(body.images)

    const newCategoryArray = body.categories.map(e => ({
        categoryId: e.categoryId,
        productId: body.id
    }));

    const newImagesArray = image.map(e => ({
        imageId: e.imageId,
        mainImage: e.mainImage,
        productId: body.id
    }));

    await productRepository.deleteManyCategoriesProduct(body.id)
    await productRepository.deleteManyImagesProduct(body.id)

    await productRepository.createManyCategoriesProduct(newCategoryArray)
    await productRepository.createManyImagesProduct(newImagesArray)

    await productRepository.putProduct({ 
        id: body.id,
        name: body.name, 
        description: body.description, 
        price: body.price,
        stock: body.stock,
        salesNumber: body.salesNumber
    })
}
const productService = {
    getAllProductsData,
    getAllProductsDataByCategoryId,
    getUniqueProductDataById,
    verifyCategoryAndImageArrays,
    verifyName,
    verifyNameBelongsId,
    createProduct,
    putProduct
}

export default productService