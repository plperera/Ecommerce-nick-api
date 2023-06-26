import { logout, signIn, signUp } from '@/controllers/auth/auth-controller'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const authRouter = Router()

authRouter
    .post("/sign-up", signUp)
    .post("/sign-in", signIn)

    .all("/*", authenticateAdminToken)
    .delete("/logout", logout)
export { authRouter }