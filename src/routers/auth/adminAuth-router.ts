
import { adminLogout, adminSignIn, adminSignUp } from '@/controllers/auth/adminAuth-controller'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const adminAuthRouter = Router()

adminAuthRouter
    .post("/sign-up", adminSignUp)
    .post("/sign-in", adminSignIn)

    .all("/*", authenticateAdminToken)
    .delete("/logout", adminLogout)

export { adminAuthRouter }