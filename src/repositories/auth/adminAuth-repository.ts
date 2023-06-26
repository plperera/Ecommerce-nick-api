import { prisma } from "@/config";
import { signUpBody } from "@/schemas/auth/signupSCHEMA";

async function findUserWithEmail(email: string){
    return prisma.userAdmin.findFirst({
        where: {
            email: email
        }
    })
}
async function createUser(body: Omit<signUpBody, "passwordVerify">){
    return prisma.userAdmin.create({
        data: {
            email: body.email,
            name: body.name,
            password: body.password
        }
    })
}
async function createSession({userAdminId, token}: {userAdminId: number, token: string}){
    return prisma.sessionAdmin.create({
        data: {
            userAdminId: userAdminId,
            token: token
        }
    })
}
async function findSession(token: string){
    return prisma.sessionAdmin.findFirst({
        where: {
            token: token
        }
    })
}
async function deleteSession(userAdminId: number){
    return prisma.sessionAdmin.deleteMany({
        where: {
            userAdminId: userAdminId
        }
    })
}
const authAdminRepository = {
    findUserWithEmail,
    createUser,
    createSession,
    findSession,
    deleteSession
}

export default authAdminRepository