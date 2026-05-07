import { api } from "./api.js";

export const cadastroApi = async (form) => {
    try{

        const response = await api.post('/cliente', form)
        return response.data

    } catch (error){
        console.error("ocorreu um erro ao cadastrar um cliente", error)
    }
}