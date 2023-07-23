import paymentService from '@/services/payments-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function handlePayment(req: Request, res: Response) {

    const paymentData = req.body;
    
    if (!paymentData) {
        res.send("Body vazio").status(httpStatus.BAD_REQUEST)
    }

    const payment = await paymentService.createPayment(paymentData);
    
    // salvar pagamento no banco de dados
    // e retornar a resposta para o cliente
    return res.send(payment);
}