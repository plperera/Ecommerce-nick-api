import { badRequestError } from "@/errors/bad-request-erros";
import { conflictError } from "@/errors/conflict-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import paymentRepository from "@/repositories/payments-repository";
import { newOrderBody, paymentBody, savePaymentBody } from "@/schemas/order/newOrderSCHEMA";
import * as mercadopago from 'mercadopago';

mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN);

export async function savePayment({paymentData, userId}: {paymentData: paymentBody, userId: number}) {

    paymentData.transaction_amount = paymentData.transaction_amount / 100

    const response: any = await mercadopago.payment.save(paymentData);

    console.log(response)

    const savePayment: savePaymentBody = {
        paymentType: response.body.payment_method.type,
        installments: response.body.installments,
        transactionAmount: Number((response.body.transaction_amount * 100).toFixed(0)),
        expirationMonth: response.body.card.expiration_month,
        expirationYear: response.body.card.expiration_year,
        firstSixDigits: response.body.card.first_six_digits,
        lastFourDigits: response.body.card.last_four_digits,
        
        payerDocumentNumber: paymentData.payer.identification.number,
        payerDocumentType: paymentData.payer.identification.type,
        payerEmail: paymentData.payer.email,

        paymentId: response.body.id,
        issuerId: response.body.issuer_id,
        paymentStatus: response.body.status,
        paymentStatusDetails: response.body.status_detail,
        
        idempotency: response.idempotency,
    }
    
    const savedPayment = await paymentRepository.savePayment({body: savePayment, userId})
          
    return savedPayment.id
}

const paymentService = {
    savePayment
}

export default paymentService