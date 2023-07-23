import { badRequestError } from "@/errors/bad-request-erros";
import { conflictError } from "@/errors/conflict-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import { newOrderBody, paymentBody } from "@/schemas/order/newOrderSCHEMA";
import * as mercadopago from 'mercadopago';

mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN);

export async function createPayment(paymentData: paymentBody) {

    paymentData.transaction_amount = paymentData.transaction_amount / 100

    const response: any = await mercadopago.payment.save(paymentData);
          
    return response;
}

const paymentService = {
    createPayment
}

export default paymentService