import { useState } from "react"
import { loginApi } from "../services/login"
import { useNavigate } from "react-router-dom"


function Login() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        senha: ''
    })

    const handleLogin = async(e) => {
        e.preventDefault()

        try{

            const response = await loginApi(form)

            if(response.success){
                alert("login realizado com sucesso")
            }

            navigate('/cadastro')


        } catch(error){
            console.log('Erro ao realizar o login', error)
        }


    }

    const EsqueciSenha = async() => {
        navigate('/esqueci_senha')
    }

  return (
    <div>
        <form onSubmit={handleLogin}>
            <label htmlFor="">email</label>
            <input type="text" name="email" id="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>

            <label htmlFor="">Senha</label>
            <input type="password" name="senha" id="senha" value={form.senha} onChange={(e) => setForm({...form, senha: e.target.value})}/>

            <a onClick={EsqueciSenha}>Esqueci minha senha</a>

            <button type="submit">Entrar</button>

        </form>
    </div>
  )
}

export default Login