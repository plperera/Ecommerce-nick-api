import { logout, signIn, signUp } from '@/controllers/auth-controller'
import { Router } from 'express'

const authRouter = Router()

authRouter
    .post("/sign-up", signUp)
    .post("/sign-in", signIn)
    .delete("/logout", logout)

export { authRouter }