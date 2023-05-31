import { prisma } from "@/config";
import { userIdBody } from "@/schemas/auth/authTokenSCHEMA";
import { signUpBody } from "@/schemas/auth/signupSCHEMA";
import { enrollmentBody } from "@/schemas/enrollment/createEnrollmentSCHEMA";

async function findByUserId(userId: number){
    return prisma.enrollment.findFirst({
        where: {
            userId: userId
        }
    });
}
async function findByCPF(cpf: string){
    return prisma.enrollment.findFirst({
        where: {
            cpf: cpf
        }
    });
}
async function create(body: enrollmentBody & userIdBody){
    return prisma.enrollment.create({
        data: {
            cpf: body.cpf,
            birthday: body.birthday,
            phone: body.phone,
            userId: body.userId
        }
    });
}
async function update(body: enrollmentBody & userIdBody){
    return prisma.enrollment.update({
        where:{
            userId: body.userId
        },
        data: {
            cpf: body.cpf,
            birthday: body.birthday,
            phone: body.phone,
            userId: body.userId
        }
    });
}

const enrollmentRepository = {
    findByUserId,
    findByCPF,
    create,
    update
}

export default enrollmentRepository