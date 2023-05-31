import { disableAddress, getAllEnrollment, newAddress, selectAddress, updateAddress } from '@/controllers/address-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const addressRouter = Router()

addressRouter
    .all("/*", authenticateToken)
    .get("", getAllEnrollment)
    .post("", newAddress)
    .put("", updateAddress)
    .put("/disable", disableAddress)
    .put("/select", selectAddress)

export { addressRouter }