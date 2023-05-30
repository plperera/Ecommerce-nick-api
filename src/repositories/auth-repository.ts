import { prisma } from "@/config";
import { signUpBody } from "@/schemas/signupSCHEMA";

async function findUserWithEmail(email: string){
    return prisma.user.findFirst({
        where: {
            email: email
        }
    })
}
async function createUser(body: Omit<signUpBody, "passwordVerify">){
    return prisma.user.create({
        data: {
            email: body.email,
            name: body.name,
            password: body.password
        }
    })
}
async function createSession({userId, token}: {userId: number, token: string}){
    return prisma.session.create({
        data: {
            userId: userId,
            token: token
        }
    })
}

const authRepository = {
    findUserWithEmail,
    createUser,
    createSession
}

export default authRepository