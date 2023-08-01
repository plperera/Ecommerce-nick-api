import paymentService from '@/services/payments-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function GetAllPayments(req: Request, res: Response) {
    try {

        const response = await paymentService.getAllPayments()

        res.send(response).status(httpStatus.OK)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export async function GetPaymentById(req: Request, res: Response) {
    try {
        const {paymentId} = req.params

        const response = await paymentService.getPaymentById(Number(paymentId))

        res.send(response).status(httpStatus.OK)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export async function HandlePaymentInSandbox(req: Request, res: Response) {
    try {
    
        const response = await paymentService.handlePaymentInSandbox()

        res.send(response).status(httpStatus.CREATED)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}