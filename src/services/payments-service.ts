import { badRequestError } from "@/errors/bad-request-erros";
import { conflictError } from "@/errors/conflict-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import addressRepository from "@/repositories/address-repository";
import paymentRepository from "@/repositories/payments-repository";
import { installmentsPix, newOrderBody, paymentBody, paymentPixBody, savePaymentBody } from "@/schemas/order/newOrderSCHEMA";
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

export async function savePixPayment(reqBody: any) {
    console.log('1')
    const { body, userId} = reqBody

    const address = await addressRepository.findActiveWithUserId( body.payer.address.addressId,  userId)

    const payment_data: paymentPixBody & installmentsPix = {
        transaction_amount: Number(body.transaction_amount) / 100,
        description: body.description,
        payment_method_id: body.payment_method_id,
        installments: 1,
        payer: {
            email: body.payer.email,
            first_name: body.payer.first_name,
            last_name: body.payer.last_name,
            identification: {
                type: body.payer.identification.type,
                number: body.payer.identification.number
            },
            address:  {
                zip_code: address.cep,
                street_name: address.street, 
                street_number: address.number,
                neighborhood: address.neighborhood,
                city: address.city,
                federal_unit: address.state
            }
        }
    }

    const response: any = await mercadopago.payment.create(payment_data);
          
    return response
}

export async function getAllPayments() { 

    let searchConfig = {
        sort: 'date_created', // ordenar por data de criação
        criteria: 'desc', // ordem descendente
        range: 'date_created', // o intervalo será pela data de criação
        begin_date: '2023-01-01T00:00:00Z', // buscar pagamentos a partir de 1º de janeiro de 2021
        end_date: '2024-01-01T00:00:00Z' // até 1º de janeiro de 2022
    };

    const response: any = await mercadopago.payment.search({qs: searchConfig});
          
    return response
}

export async function getPaymentById(paymentId: number) { 

    const response: any = await mercadopago.payment.get(paymentId);
          
    return response
}

export async function handlePaymentInSandbox() { 

    const payment = {
        //total: 1000,
        description: 'Teste de pagamento por Pix',
        //currency: 'BRL',
        payer: {
          email: 'test_user_1435723491@testuser.com',           
          first_name: 'Test',
          last_name: 'Test',
        },
        payment_method_id: 'pix',
        transaction_amount: 1000,
        installments: 1,
      };
    
    const response: any = await mercadopago.payment.create(payment)
          
    return response
}

const paymentService = {
    savePayment,
    savePixPayment,
    getAllPayments,
    getPaymentById,
    handlePaymentInSandbox
}

export default paymentService