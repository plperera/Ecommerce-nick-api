import { adminLogout, adminSignIn, adminSignUp } from '@/controllers/auth/adminAuth-controller'
import { authenticateAdminToken } from '@/middlewares/auth/authenticationAdmin-middlerare'
import { Router } from 'express'

const adminAuthRouter = Router()

adminAuthRouter
    .post("/auth/sign-up", adminSignUp)
    .post("/auth/sign-in", adminSignIn)

    .all("/*", authenticateAdminToken)
    .delete("/auth/logout", adminLogout)
export { adminAuthRouter }