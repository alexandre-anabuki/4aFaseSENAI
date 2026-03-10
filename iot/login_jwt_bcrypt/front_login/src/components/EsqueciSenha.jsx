import React, { useState } from 'react'
import { esqueciSenha } from '../services/login'
import { useNavigate } from 'react-router-dom'

function EsqueciSenha() {

    const navigate = useNavigate('')

    const [form, setForm] = useState({
        email: "",
        senha: "",
        confirma_senha: ""
    })

    const handleChangePassword = async (e) => {
        e.preventDefault()

        try{
            const ok = await esqueciSenha(form)
            if(ok.success){
                alert("senha alterada com sucesso")
            }

            navigate("/login")

        } catch(error){
            console.log("erro ao trocar de senha", error)
        }

    }

  return (
    <div>
        <form onSubmit={handleChangePassword}>

        <input type="text" placeholder='Digite seu email' name='' id='' value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
        <input type="text" placeholder='Nova senha' name='' id='' value={form.senha} onChange={(e) => setForm({...form, senha: e.target.value})}/>
        <input type="text" placeholder='Confirmar Senha' name='' id='' value={form.confirma_senha} onChange={(e) => setForm({...form, confirma_senha: e.target.value})}/>

        <button type='submit'>Trocar Senha</button>

        </form>
    </div>
  )
}

export default EsqueciSenha