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
import { newOrderBody, orderBody, orderCartBody, verifyValuesBody } from "@/schemas/order/newOrderSCHEMA";


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
async function verifyShipping(shippingId: number){
    const shippingResponse = await shippingRepository.findById(shippingId)
    
    if (!shippingResponse){
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

async function createNewOrder({body, userId, paymentId}: {body: newOrderBody, userId: number, paymentId: number}){

    /*

    const paymentId = 1

    const newOrder = await orderRepository.createNewOrder({body, userId, totalPrice, paymentId})

    const newCategoryArray = body.products.map(e => ({      
        orderId: newOrder.id,
        productId: e.productId,
        quantity: e.amount,
        price: e.price
    }));
    
    await orderRepository.createManyOrderProducts(newCategoryArray)
    */
    return
}

const orderService = {
    getAllOrdersDataByUser,
    createNewOrder,
    verifyAddress,
    verifyShipping,
    verifyCart,
    verifyValues
}

export default orderService