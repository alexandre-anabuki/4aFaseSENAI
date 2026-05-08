import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cadastroApi } from '../services/quarto'

function Quarto() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        numero: '',
        tipo_quarto: '',
        capacidade: '',
        funcionario_id: ''
    })

    const handleSubmit = async(e) =>{
        e.preventDefault()

        try {
            const response = await cadastroApi(form)
            if(response.success){
                alert('quarto criado com sucesso')
            }

            navigate("/menuReserva")


        } catch (error) {
            console.log(error)
        }
    }

  return (
        <>

            <div className="container">
            <h1>Cadastro</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="numero" className="form-label">numero</label>
                        <input type="number" className="form-control" id="numero" placeholder="123" value={form.numero} onChange={(event) =>setForm({...form, numero : event.target.value})}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="capacidade" className="form-label">capacidade</label>
                        <input type="number" className="form-control" id="capacidade" placeholder="capacidade máxima de 6 pessoas" value={form.capacidade} onChange={(event) =>setForm({...form, capacidade : event.target.value})}/>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="tipo_quarto" className="form-label">Tipo de quarto</label>
                        <select name="tipo_quarto" value={form.tipo_quarto} onChange={(event) =>setForm({...form, tipo_quarto : event.target.value})}>
                            <option value="">Selecione</option>
                            <option value="Simples">Simples</option>
                            <option value="Duplo">Duplo</option>
                            <option value="Suíte">Suíte</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="funcionario_id" className="form-label">ID</label>
                        <input type="text" className="form-control" id="funcionario_id" value={form.funcionario_id} onChange={(event) =>setForm({...form, funcionario_id : event.target.value})}/>
                    </div>

                    <button className="btn btn-danger" type="submit">Salvar Cadastro</button>

                </form>

            </div>


        </>
  )
}

export default Quarto