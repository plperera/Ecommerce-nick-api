import { badRequestError } from "@/errors/bad-request-erros";
import { conflictError } from "@/errors/conflict-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import * as mercadopago from 'mercadopago';

mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN);

// a função pode variar dependendo das suas necessidades
export async function createPayment(paymentData: any) {
    // Coloque aqui a lógica para criar um pagamento com o Mercado Pago.
    // O seguinte é um exemplo de pagamento básico.
    const payment = await mercadopago.payment.create(paymentData);
    return payment;
}

const paymentService = {
    createPayment
}

export default paymentService