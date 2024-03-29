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
import { createNewOrderAndOrderProducts, newOrderBody, orderBody, orderCartBody, verifyValuesBody } from "@/schemas/order/newOrderSCHEMA";
import { updateOrderBody } from "@/schemas/order/updateOrderSCHEMA";


async function getAllOrdersDataByUser(userId: number){

    const result = await orderRepository.findAllOrderByUser(userId)

    const formatedProducts = result.map(e => {
        return {
            orderId: e.id,
            status: e.status,
            address: e.address,
            createdAt: e.createdAt,
            installments: e.payment.installments,
            paymentStatus: e.payment.paymentStatus,
            paymentType: e.payment.paymentType,
            transactionAmount: e.payment.transactionAmount,
            shippingPrice: e.shippingPrice,
            shippingName: e.shipping.name,
            products: e.orderProduct.map(product => {
                return {
                    productName: product.product.name,
                    productPrice: product.price,
                    productQuantity: product.quantity,
                    productImages: product.product.productImage.map( image => {
                        return {
                            imageUrl: image.image.imageUrl
                        }
                    })
                }
            }), 
        }
    })
    return formatedProducts
}
async function getAllOrdersData(){

    const result = await orderRepository.findAllOrder()

    const formatedProducts = result.map(e => {
        return {
            orderId: e.id,
            status: e.status,
            address: e.address,
            createdAt: e.createdAt,
            installments: e.payment.installments,
            paymentStatus: e.payment.paymentStatus,
            paymentType: e.payment.paymentType,
            transactionAmount: e.payment.transactionAmount,
            shippingPrice: e.shippingPrice,
            shippingName: e.shipping.name,
            products: e.orderProduct.map(product => {
                return {
                    productName: product.product.name,
                    productPrice: product.price,
                    productQuantity: product.quantity,
                    productImages: product.product.productImage.map( image => {
                        return {
                            imageUrl: image.image.imageUrl
                        }
                    })
                }
            }), 
        }
    })
    return formatedProducts
}
async function verifyOrderIdExist(orderId: number){

    const result = await orderRepository.findUniqueByOrderId(orderId)

    if( !result ){
        return notFoundError("Pedido não encontrado")
    }

    return 
}
async function verifyAddress({ userId, addressId}: { userId: number, addressId: number}){

    const addressResponse = await addressRepository.findActiveWithUserId(addressId, userId)
    
    if (!addressResponse){
        throw notFoundError("Endereço inválido")
    }

    return
}
async function verifyShipping({shippingId, shippingValue}: {shippingId: number, shippingValue:number}){
    const shippingResponse = await shippingRepository.findById(shippingId)
    
    if (!shippingResponse || shippingResponse?.price !== shippingValue){
        throw notFoundError("Método de entrega inválido")
    }
    
    return
}
async function verifyCart(cartProducts: orderCartBody){
    
    const productsArrayResponse = await productRepository.findAllActiveById(cartProducts.map(e => { 
        return {productId: e.productId}
    }))

    if (productsArrayResponse.length !== cartProducts.length){
        throw badRequestError("O produto que esta sendo comprado é inválido")
    }

    return productsArrayResponse
}
function verifyValues({products, cart, shippingValue, transaction_amount}: verifyValuesBody){

    const hashPrice: Record<string, number> = {} 
    let totalAmount: number = 0

    products.forEach(e => {

        if(e.price === 0){
            throw badRequestError("Itens de orçamento não podem ser comprados pelo checkout")
        }

        hashPrice[`productId_${e.id}`] = e.price;

    });

    cart.forEach(e => {

        totalAmount += hashPrice[`productId_${e.productId}`] * e.quantity;
        
    });

    totalAmount += shippingValue

    if (transaction_amount !== totalAmount){
        throw badRequestError("O valor da transação não é o mesmo do preço total do carrinho")
    }
    
    return   
}
async function createNewOrder(createNewOrderAndOrderProducts: createNewOrderAndOrderProducts){

    const newOrder = await orderRepository.createOrder({
        userId: createNewOrderAndOrderProducts.userId, 
        addressId: createNewOrderAndOrderProducts.body.addressId, 
        shippingId: createNewOrderAndOrderProducts.body.shippingId, 
        paymentId: createNewOrderAndOrderProducts.paymentId,
        shippingPrice: createNewOrderAndOrderProducts.shippingPrice
    })
    
    const hashProduct: any = {} 
    const formatedProducts: any = []

    createNewOrderAndOrderProducts.products.forEach(e => {
        hashProduct[`productId_${e.id}`] = {price: e.price, productId: e.id, orderId: newOrder.id};
    });

    createNewOrderAndOrderProducts.body.cart.forEach(e => {
        formatedProducts.push({...hashProduct[`productId_${e.productId}`], quantity: e.quantity})
    });

    await orderRepository.createManyOrderProducts(formatedProducts)

    return
}
async function updateOrderStatus({status, orderId}: updateOrderBody){

    await orderRepository.updateOrderStatus({status, orderId})
    
    return
}


const orderService = {
    getAllOrdersDataByUser,
    createNewOrder,
    verifyAddress,
    verifyShipping,
    verifyCart,
    verifyValues,
    getAllOrdersData,
    verifyOrderIdExist,
    updateOrderStatus
}

export default orderService