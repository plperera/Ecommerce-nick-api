import { badRequestError } from "@/errors/bad-request-erros";
import { conflictError } from "@/errors/conflict-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import { unauthorizedError } from "@/errors/unauthorized-error";
import addressRepository from "@/repositories/address-repository";
import categoryRepository from "@/repositories/category-repository";
import imageRepository from "@/repositories/image-repository";
import orderRepository from "@/repositories/order-repository";
import productRepository, { productBodyResponse, productUniqueBodyResponse } from "@/repositories/product-repository";
import shippingRepository from "@/repositories/shipping-repository";
import { createOrderBody, createOrderProduct } from "@/schemas/order/createProductSCHEMA";
import { createProductBody, imagesArray } from "@/schemas/product/createProductSCHEMA";


async function getAllOrdersDataByUser(userId: number){

    const result = await orderRepository.findAllOrderByUser(userId)

    const formattedOrders = result.map((order) => ({
        address: {
          cep: order.address.cep,
          street: order.address.street,
          city: order.address.city,
          state: order.address.state,
          number: order.address.number,
          neighborhood: order.address.neighborhood,
          addressDetail: order.address.addressDetail,
        },
        shippingMethod: order.shipping.name,
        products: order.orderProduct.map((op) => ({
          productId: op.product.id,
          name: op.product.name,
          price: op.product.price,
          amount: op.quantity,
        })),
        status: order.status,
        totalPrice: order.totalPrice,
        shippingPrice: order.shipping.price,
    }));

    return formattedOrders
}
async function verifyAddress({ userId, addressId}: { userId: number, addressId: number}){

    const addressResponse = await addressRepository.findActiveWithUserId(addressId, userId)
    
    if (!addressResponse){
        throw notFoundError("Endereço inválido")
    }

    return
}
async function verifyShipping(methodId: number){
    const shippingResponse = await shippingRepository.findById(methodId)
    
    if (!shippingResponse){
        throw notFoundError("Método de entrega inválido")
    }
    
    return
}
async function verifyProducts(products: createOrderProduct[]){
    products.map( async e => {

        const productResponse = await productRepository.findProductById(e.productId)
    
        if (!productResponse){
            throw notFoundError("Produto inválido")
        }

        if (!productResponse.isActive){
            throw notFoundError("Produto indisponivel")
        }

    })
    return
}
async function createNewOrder({body, userId}: {body: createOrderBody, userId: number}){

    const totalPrice = body.products.reduce((sum, product) => {
        return sum + product.amount;
    }, 0);

    const newOrder = await orderRepository.createNewOrder({body, userId, totalPrice})

    const newCategoryArray = body.products.map(e => ({      
        orderId: newOrder.id,
        productId: e.productId,
        quantity: e.amount,
        price: e.price
    }));
    
    await orderRepository.createManyOrderProducts(newCategoryArray)
    
    return
}
const orderService = {
    getAllOrdersDataByUser,
    createNewOrder,
    verifyAddress,
    verifyShipping,
    verifyProducts
}

export default orderService