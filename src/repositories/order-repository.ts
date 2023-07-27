import { prisma } from "@/config";
import { formatedProductsBody } from "@/schemas/order/newOrderSCHEMA";
import { updateOrderBody } from "@/schemas/order/updateOrderSCHEMA";

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
async function findAllOrder(){
  return prisma.order.findMany({
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
async function findUniqueByOrderId(orderId: number){
  return prisma.order.findUnique({
    where: {
      id: orderId
    }
  })
}
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
async function updateOrderStatus({status, orderId}: updateOrderBody){
  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: status
    }
  })
}

const orderRepository = {
  createOrder,
  createManyOrderProducts,
  findAllOrderByUser,
  findAllOrder,
  findUniqueByOrderId,
  updateOrderStatus
}

export default orderRepository