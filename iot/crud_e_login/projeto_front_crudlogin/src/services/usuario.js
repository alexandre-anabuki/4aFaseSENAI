import { api } from "./api.js";

export const cadastroUsuario = async (form) => {
    try{

        const response = await api.post('/usuario', form)
        return response.data

    } catch (error){
        console.error("ocorreu um erro ao cadastrar um usuario", error)
    }
}