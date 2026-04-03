import { useState } from 'react'
import { esqueciSenha } from '../services/login'
import { useNavigate } from 'react-router-dom'

function EsqueciSenha() {

    const navigate = useNavigate('')

    const [form, setForm] = useState({
        email: "",
        senha_nova: "",
        confirmar_senha: ""
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

        <input type="text" placeholder='Digite seu email' name='email' id='email' value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
        <input type="text" placeholder='Nova senha' name='senha_nova' id='senha_nova' value={form.senha_nova} onChange={(e) => setForm({...form, senha_nova: e.target.value})}/>
        <input type="text" placeholder='Confirmar Senha' name='confirmar_senha' id='confirmar_senha' value={form.confirmar_senha} onChange={(e) => setForm({...form, confirmar_senha: e.target.value})}/>

        <button type='submit'>Trocar Senha</button>

        </form>
    </div>
  )
}

export default EsqueciSenha