import { prisma } from "@/config";
import { newCategoryBody } from "@/schemas/category/newCategorySCHEMA";
import { putCategoryBody } from "@/schemas/category/putCategorySCHEMA";
import { formatedProductsBody } from "@/schemas/order/newOrderSCHEMA";
import { categoriesArray, productBody } from "@/schemas/product/createProductSCHEMA";
import { putProductBody } from "@/schemas/product/putProductSCHEMA";
import { payment } from "mercadopago";



async function findAllOrderByUser( userId: number ){
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      session: true,
      enrollment: true,
      address: true,
      order: {
        include: {
          orderProduct: {
            include: {
              product: {
                include: {
                  productCategory: true,
                  productImage: true
                }
              }
            }
          },
          address: true,
          shipping: true,
          payment: true
        }
      },
      payment: true,
      productFavorite: {
        include: {
          product: {
            include: {
              productCategory: true,
              productImage: true
            }
          }
        }
      }
    }
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
async function createOrder( {userId, addressId, shippingId, paymentId}: {userId: number, addressId: number, shippingId: number, paymentId: number} ){
  return prisma.order.create({
    data: {
      userId: userId,
      addressId: addressId,
      shippingId: shippingId,
      paymentId: paymentId
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