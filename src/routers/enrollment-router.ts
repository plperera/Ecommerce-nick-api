
import { getEnrollment } from '@/controllers/enrollment-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const enrollmentRouter = Router()

enrollmentRouter
    .all("/*", authenticateToken)
    .get("", getEnrollment)
    .post("", )
    .put("", )

export { enrollmentRouter }