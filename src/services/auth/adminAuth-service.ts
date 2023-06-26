import httpStatus from "http-status"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { signUpBody } from "@/schemas/auth/signupSCHEMA"
import { unauthorizedError } from "@/errors/unauthorized-error"
import { badRequestError } from "@/errors/bad-request-erros";
import { conflictError } from "@/errors/conflict-error";
import { notFoundError } from "@/errors/not-found-error";
import { signInBody } from "@/schemas/auth/signInSCHEMA";
import authAdminRepository from "@/repositories/auth/adminAuth-repository";

async function verifyUser(body: signUpBody){

    if (body.password !== body.passwordVerify){
        throw badRequestError("Senhas diferentes")
    }

    const hasUser = await authAdminRepository.findUserWithEmail(body.email)

    if(hasUser){
        throw conflictError("Email ja cadastrado")
    }   

    return

}
async function createNewUser(body: Omit<signUpBody, "passwordVerify">){

    const newUser = await authAdminRepository.createUser({
        email: body.email, 
        name:body.name, 
        password:bcrypt.hashSync(body.password, 10)
    })    

    return newUser

}
async function verifyAccees(body: signInBody){

    const hasUser = await authAdminRepository.findUserWithEmail(body.email)
    
    if(!hasUser){
        throw badRequestError("Email não encontrado")
    }  
        
    const isValidPassword = bcrypt.compareSync(body.password, hasUser.password)

    if(!isValidPassword){
        throw unauthorizedError("Senha invalida")
    }

    return { userAdminId: hasUser.id }

}
async function createSession(userAdminId: number){

    const token = jwt.sign({ userAdminId }, process.env.JWT_SECRET)

    const session = await authAdminRepository.createSession({userAdminId, token})
    
    return session.token
 
}
async function deleteSession(userAdminId: number){

    await authAdminRepository.deleteSession(userAdminId)
    return 
 
}

const authAdminService = {
    verifyUser,
    createNewUser,
    verifyAccees,
    createSession,
    deleteSession
}

export default authAdminService