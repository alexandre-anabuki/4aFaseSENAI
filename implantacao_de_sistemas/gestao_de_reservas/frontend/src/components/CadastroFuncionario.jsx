import { useState } from "react"
import { cadastroApi } from "../services/funcionario"
import { Navigate, useNavigate } from "react-router-dom"
import { InputMask } from "imask"

const CadastroFuncionario = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        cpf: '',
        turno: '',
        telefone: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try{
            const response = await cadastroApi(form)
            if(response.success){
                alert('usuario criado com sucesso')
            }

            navigate("/login")

        } catch(error){
            console.error(error)
        }
    }

    return (
        <>

            <div className="container">
            <h1>Cadastro</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="nome" placeholder="nome completo" value={form.nome} onChange={(event) =>setForm({...form, nome : event.target.value})}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="name@example.com" value={form.email} onChange={(event) =>setForm({...form, email : event.target.value})}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cpf" className="form-label">CPF</label>
                        {/* <input type="text" className="form-control" id="cpf" placeholder="12323131209" value={form.cpf} onChange={(event) =>setForm({...form, cpf : event.target.value})}/> */}
                        <InputMask
                            mask = "000.000.000-00"
                            name = "cpf"
                            value={form.cpf}
                            onChange={(event) => setForm({...form, cpf : event.target.value})}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="telefone" className="form-label">Telefone</label>
                        {/* <input type="text" className="form-control" id="telefone" placeholder="(11) 55555555" value={form.telefone} onChange={(event) =>setForm({...form, telefone : event.target.value})}/> */}
                        <InputMask
                            mask = "(00) 0000-0000"
                            name = "telefone"
                            value={form.telefone}
                            onChange={(event) => setForm({...form, telefone : event.target.value})}
                        />    
                    </div>

                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">Turno</label>
                        <select name="turno" value={form.turno} onChange={(event) =>setForm({...form, turno : event.target.value})}>
                            <option value="">Selecione</option>
                            <option value="Matutino">Matutino</option>
                            <option value="Vespertino">Vespertino</option>
                            <option value="Noturno">Noturno</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="senha" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="senha" placeholder="****************" value={form.senha} onChange={(event) =>setForm({...form, senha : event.target.value})}/>
                    </div>

                    <button className="btn btn-danger" type="submit">Salvar Cadastro</button>

                </form>

            </div>


        </>
    )
}

export default CadastroFuncionario