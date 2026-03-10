import { api } from "./api.js";

export const loginApi = async (form) => {
    try{

        const response = await api.post('/login', form)
        return response.data

    } catch (error){
        console.log("ocorreu um erro ao realizar o login. Mensagem:", error.data )
    }
}

export const esqueciSenha = async(form) => {
    try{

        const response = await api.post('/esquece_senha', form)
        return response.data

    } catch(error){
        console.log("ocorreu um erro ao tentar trocar a senha. Mensagem:", error.data )
    }
}