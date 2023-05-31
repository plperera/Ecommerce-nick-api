import enrollmentRepository from "@/repositories/enrollment-repository";
import { userIdBody } from "@/schemas/auth/authTokenSCHEMA";
import { forbiddenError } from "@/errors/forbidden-error";
import { enrollmentBody } from "@/schemas/enrollment/createEnrollmentSCHEMA";

async function getEnrollmentByUserId(userId: number){

    const result = await enrollmentRepository.findByUserId(userId)

    return result

}
async function validEnrollmentCreate(body: enrollmentBody & userIdBody){

    const hasEnrollment = await enrollmentRepository.findByUserId(body.userId)

    if(hasEnrollment){
        throw forbiddenError("Usuario ja possui cadastro")
    }

    const cpfIsInvalid = await enrollmentRepository.findByCPF(body.cpf)
    
    if(cpfIsInvalid){
        throw forbiddenError("CPF ja cadastrado")
    }

}
async function validEnrollmentUpdate(body: enrollmentBody & userIdBody){

    const hasEnrollment = await enrollmentRepository.findByUserId(body.userId)

    if(!hasEnrollment){
        throw forbiddenError("Usuario não ja possui cadastro")
    }

    const cpfIsInvalid = await enrollmentRepository.findByCPF(body.cpf)
    
    if(cpfIsInvalid && cpfIsInvalid?.cpf !== body.cpf){
        throw forbiddenError("CPF ja cadastrado")
    }

}
async function createEnrollment(body: enrollmentBody & userIdBody){

    validEnrollmentCreate(body)

    const result = await enrollmentRepository.create(body)

    return 

}
async function updateEnrollment(body: enrollmentBody & userIdBody){

    validEnrollmentUpdate(body)

    const result = await enrollmentRepository.update(body)

    return

}

const enrollmentService = {
    getEnrollmentByUserId,
    createEnrollment,
    updateEnrollment
}

export default enrollmentService