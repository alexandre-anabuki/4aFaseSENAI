import { useState } from 'react'

import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'
import { IMaskInput } from 'react-imask';


function Cadastro() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [pessoa, setPessoa] = useState('')
    const [cpf, setCpf] = useState('')

    const mascara =
        pessoa === '1' ? "000.000.000-00" : "00.000.000/0000-00"

    function cleanInputs() {
        setNome('')
        setEmail('')
        setSenha('')
        setPessoa('')
        setCpf('')
    }

    const handleRegister = async(e) => {
        e.preventDefault()

        try {
            await axios.post('http://localhost:8081/', {
                nome: nome, 
                email: email,
                senha: senha,
                pessoa: pessoa,
                cpf: cpf
            })
            toast.success("Usuario cadastrado!")
            cleanInputs()
        } catch (error) {
            toast.error("Erro ao cadastrar usuário")
            console.error(error)
        }
    }

    return (
        <>
            <h1>Cadastro</h1>
            <form className="formulario" onSubmit={handleRegister}>
                <label htmlFor="text">Nome Completo</label>
                <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder='Nome Completo' /> <br></br>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' /> <br></br>

                <label htmlFor="password">Senha:</label>
                <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder='Senha' /> <br></br>

                <label htmlFor="pessoa">Tipo Pessoa:</label>
                <select name="pessoa" id="pessoa" value={pessoa} onChange={(e) => {setPessoa(e.target.value), setCpf("")}}>
                    <option value="">Selecione</option>
                    <option value="1">Fisíco</option>
                    <option value="2">Jurídica</option>
                </select> <br />

                {/* <label htmlFor="password">CPF/CNPJ</label>

                <IMaskInput 
                mask="000.000.000-00"
                value={cpf}
                unmask={true} // true|false|'typed'
                onAccept={(value) => setCpf(value)}
                placeholder=''
                /> */}

                <label>
                    {pessoa === "2" ? "CNPJ" : "CPF"}
                </label>

                {pessoa &&(
                    <IMaskInput
                        mask={mascara}
                        value={cpf}
                        unmask={true}
                        onAccept={(value) => setCpf(value)}
                        placeholder={
                            pessoa === '2' ? "00.000.000/0000-00" : "000.000.000-00"
                        }
                    />
                )} <br />

                <button type="submit">Salvar</button>
            </form>
            <ToastContainer />
        </>
    )
}

export default Cadastro