import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginApi } from '../services/login'

function Login() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        senha: ''
    })

    const handleLogin = async(e) => {
        e.preventDefault()

        try {
            const response = await loginApi(form)

            if(response.success){
                alert("Login realizado com sucesso")
            }

            //navigate("/menuReserva")

        } catch (error) {
            console.log('Erro ao realizar o login', error)
        }
    }

    const criarConta = async() => {
        navigate("/cadastrarCliente")
    }

  return (
    <div>
        <form onSubmit={handleLogin}>
            <label htmlFor="">email</label>
            <input type="text" name="email" id="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>

            <label htmlFor="">Senha</label>
            <input type="password" name="senha" id="senha" value={form.senha} onChange={(e) => setForm({...form, senha: e.target.value})}/>

            <button type="submit">Entrar</button>

            <a href="#" class='pe-auto' onClick={criarConta}>Não possui uma conta?</a>

        </form>
    </div>
  )
}

export default Login