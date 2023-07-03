import { prisma } from "@/config";
import { newCategoryBody } from "@/schemas/category/newCategorySCHEMA";
import { putCategoryBody } from "@/schemas/category/putCategorySCHEMA";
import { createOrderBody } from "@/schemas/order/createProductSCHEMA";
import { categoriesArray, productBody } from "@/schemas/product/createProductSCHEMA";
import { putProductBody } from "@/schemas/product/putProductSCHEMA";


type ProductBody = {
    orderId: number,
    productId: number,
    quantity: number,
    price: number
};

async function findAllOrderByUser( userId: number ){
    return prisma.order.findMany({
        where: {
            userId: userId,
        },
        select: {
            address: {
                select: {
                cep: true,
                street: true,
                city: true,
                state: true,
                number: true,
                neighborhood: true,
                addressDetail: true,
                },
            },
            shipping: {
              select: {
                name: true,
                price: true,
              },
            },
            orderProduct: {
              select: {
                product: {
                  select: {
                    id: true,
                    name: true,
                    price: true,
                  },
                },
                quantity: true,
              },
            },
            status: true,
            totalPrice: true,
        }
    })
}
async function createNewOrder({body, userId, totalPrice}: {body: createOrderBody, userId: number, totalPrice: number}){
    return prisma.order.create({
        data: {
            userId: userId,
            addressId: body.addressId,
            shippingId: body.methodId,
            totalPrice: totalPrice
        }
    })

}
async function createManyOrderProducts( productArray: ProductBody[] ){
    return prisma.orderProduct.createMany({
        data: productArray
    })

}

const orderRepository = {
    findAllOrderByUser,
    createNewOrder,
    createManyOrderProducts
}

export default orderRepository