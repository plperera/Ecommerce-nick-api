
import { getEnrollment, newEnrollment, putEnrollment } from '@/controllers/enrollment-controller'
import { authenticateToken } from '@/middlewares/auth/authentication-middlerare'
import { Router } from 'express'

const enrollmentRouter = Router()

enrollmentRouter
    .all("/*", authenticateToken)
    .get("", getEnrollment)
    .post("", newEnrollment)
    .put("", putEnrollment)

export { enrollmentRouter }