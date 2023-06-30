import { conflictError } from "@/errors/conflict-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import productRepository, { productBodyResponse, productUniqueBodyResponse } from "@/repositories/product-repository";

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
async function getUniqueProductDataById( productId: number ): Promise<productUniqueBodyResponse | []> {

    const result = await productRepository.findProductById( productId )

    if (result) {
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
        //return formattedProduct
    } 
    
    return []

}
/*
async function verifyName(name: string){

    const result = await categoryRepository.findByName(name)

    if ( result ){
        throw conflictError("Nome de categoria já existente")
    }

    return 
}
async function verifyNameBelongsId ({ name, id }: Omit<putShippingBody, "price">){

    const result = await categoryRepository.findByName(name)

    if ( result && result?.id !== id){
        throw conflictError("Nome de categoria já atrelada a outro id")
    }

    return 
}
async function verifyValidId(id: number){

    const result = await categoryRepository.findById(id)

    if ( !result ){
        throw notFoundError("Não existe categoria com o ID passado")
    }

    return 
}
async function createCategory({ name }: newCategoryBody){

    await categoryRepository.createCategory({ name })

    return 
}
async function putCategory({ name, id }: putCategoryBody){

    await categoryRepository.putCategory({ name, id })

    return 
}
async function disableCategory(id: number){

    await categoryRepository.disableCategory( id )

    return 
}
*/
const productService = {
    getAllProductsData,
    getAllProductsDataByCategoryId,
    getUniqueProductDataById
}

export default productService