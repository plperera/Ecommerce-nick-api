import { prisma } from "@/config";
import { newCategoryBody } from "@/schemas/category/newCategorySCHEMA";
import { putCategoryBody } from "@/schemas/category/putCategorySCHEMA";
import { formatedProductsBody } from "@/schemas/order/newOrderSCHEMA";
import { categoriesArray, productBody } from "@/schemas/product/createProductSCHEMA";
import { putProductBody } from "@/schemas/product/putProductSCHEMA";
import { payment } from "mercadopago";





async function findAllOrderByUser(userId: number){
  return prisma.order.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      status: true,
      createdAt: true,
      shippingPrice: true,
      address: {
        select: {
          id: true,
          addressName: true,
          cep: true,
          street: true,
          city: true,
          state: true,
          number: true,
          neighborhood: true,
          addressDetail: true,
          isActive: true,
        },
      },
      shipping: {
        select: {
          name: true,
        },
      },
      payment: {
        select: {
          paymentType: true,
          installments: true,
          transactionAmount: true,
          paymentStatus: true,
        },
      },
      orderProduct: {
        select: {
          quantity: true,
          price: true,
          product: {
            select: {
              name: true,
              productImage: {
                select: {
                  image: {
                    select: {
                      imageUrl: true
                    }
                  }
                }
              }
            },
          },
        },
      },
    },
  })
}

/*
async function createNewOrder({body, userId, totalPrice, paymentId}: {body: createOrderBody, userId: number, totalPrice: number, paymentId: number}){
    return prisma.order.create({
        data: {
            userId: userId,
            addressId: body.addressId,
            shippingId: body.methodId,
            totalPrice: totalPrice,
            paymentId: paymentId
        }
    })

}
*/
async function createOrder( {userId, addressId, shippingId, paymentId, shippingPrice}: {userId: number, addressId: number, shippingId: number, paymentId: number, shippingPrice: number} ){
  return prisma.order.create({
    data: {
      userId: userId,
      addressId: addressId,
      shippingId: shippingId,
      paymentId: paymentId,
      shippingPrice: shippingPrice
    }
  })

}
async function createManyOrderProducts( productArray: formatedProductsBody ){
    return prisma.orderProduct.createMany({
        data: productArray
    })

}

const orderRepository = {
  createOrder,
  createManyOrderProducts,
  findAllOrderByUser
}

export default orderRepository