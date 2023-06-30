import Multer from '@/config/multerconfig'
import { SaveImage } from '@/controllers/teste-controller'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'
//import upload from '@/config/multerconfig'

const testeRouter = Router()

testeRouter
    .post("", Multer.single('arquivoTeste'), SaveImage)

export { testeRouter }