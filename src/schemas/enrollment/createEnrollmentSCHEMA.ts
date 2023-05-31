import joi from "joi"

export type enrollmentBody = {
    cpf: string,
    birthday: string,
    phone: string
}

const enrollmentSCHEMA = joi.object<enrollmentBody>({

    cpf: joi.string().required().min(12),
    birthday: joi.string().required(),
    phone: joi.string().required().min(10)

})

export {enrollmentSCHEMA}