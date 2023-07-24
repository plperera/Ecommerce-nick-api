import { prisma } from "@/config";
import { newCategoryBody } from "@/schemas/category/newCategorySCHEMA";
import { putCategoryBody } from "@/schemas/category/putCategorySCHEMA";
import { savePaymentBody } from "@/schemas/order/newOrderSCHEMA";
import { categoriesArray, productBody } from "@/schemas/product/createProductSCHEMA";
import { putProductBody } from "@/schemas/product/putProductSCHEMA";

async function savePayment({body, userId}: {body: savePaymentBody, userId: number}){
    console.log(userId)
    return prisma.payment.create({
        data: {
            userId: userId,
            paymentType: body.paymentType,
            installments: body.installments,
            transactionAmount: body.transactionAmount,
            expirationMonth: body.expirationMonth,
            expirationYear: body.expirationYear,
            firstSixDigits: body.firstSixDigits,
            lastFourDigits: body.lastFourDigits,
            payerDocumentNumber: body.payerDocumentNumber,
            payerDocumentType: body.payerDocumentType,
            payerEmail: body.payerEmail,
            paymentId: body.paymentId,
            issuerId: body.issuerId,
            paymentStatus: body.paymentStatus,
            paymentStatusDetails: body.paymentStatusDetails,
            idempotency: body.idempotency
        }
    });
}

const paymentRepository = {
    savePayment
}

export default paymentRepository