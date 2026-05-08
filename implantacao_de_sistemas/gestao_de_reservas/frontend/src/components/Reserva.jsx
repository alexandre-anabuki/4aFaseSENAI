import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cadastroApi } from '../services/quarto'
import { IMaskInput } from 'react-imask'

function Reserva() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        data_horario_entrada: '',
        data_horario_saida: '',
        qtd_hospedes: '',
        tipo_pagamento: '',
        valor: '',
        observacoes: '',
        cliente_id: '',
        quarto_id: ''
    })

    const handleSubmit = async(e) =>{
        e.preventDefault()

        try {
            const response = await cadastroApi(form)
            if(response.success){
                alert('quarto criado com sucesso')
            }



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
                        <label htmlFor="data_horario_entrada" className="form-label">Data e horario da entrdada</label>
                        {/* <input type="number" className="form-control" id="numero" placeholder="123" value={form.numero} onChange={(event) =>setForm({...form, numero : event.target.value})}/> */}
                        <IMaskInput 
                          mask = "0000-00-00 00:00:00"
                          name= 'data_horario_entrada'
                          placeholder='Ano/mês/dia hora:min:seg'
                          value = {form.data_horario_entrada}
                          onChange={(event) => setForm({...form, data_horario_entrada: event.target.value})}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="data_horario_saida" className="form-label">Data e horario da saida</label>
                        {/* <input type="number" className="form-control" id="numero" placeholder="123" value={form.numero} onChange={(event) =>setForm({...form, numero : event.target.value})}/> */}
                        <IMaskInput 
                          mask = "0000-00-00 00:00:00"
                          name= 'data_horario_saida'
                          placeholder='Ano/mês/dia hora:min:seg'
                          value = {form.data_horario_saida}
                          onChange={(event) => setForm({...form, data_horario_saida: event.target.value})}
                        />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="tipo_pagamento" className="form-label">Tipo de pagamento</label>
                        <select name="tipo_pagamento" value={form.tipo_pagamento} onChange={(event) =>setForm({...form, tipo_pagamento : event.target.value})}>
                            <option value="">Selecione</option>
                            <option value="Dinehiro">Dinheiro</option>
                            <option value="Cartão">Cartão</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="qtd_hospedes" className="form-label">Quantidade de hóspedes</label>
                        <input type="text" className="form-control" id="qtd_hospedes" value={form.qtd_hospedes} onChange={(event) =>setForm({...form, qtd_hospedes : event.target.value})}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="valor" className="form-label">Valor total</label>
                        <input type="text" className="form-control" id="valor" value={form.valor} onChange={(event) =>setForm({...form, valor : event.target.value})}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="observacoes" className="form-label">Observações</label>
                        <input type="text" className="form-control" id="observacoes" value={form.observacoes} onChange={(event) =>setForm({...form, observacoes : event.target.value})}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cliente_id" className="form-label">ID do cliente</label>
                        <input type="text" className="form-control" id="cliente_id" value={form.cliente_id} onChange={(event) =>setForm({...form, cliente_id : event.target.value})}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="quarto_id" className="form-label">ID do quarto</label>
                        <input type="text" className="form-control" id="quarto_id" value={form.quarto_id} onChange={(event) =>setForm({...form, quarto_id : event.target.value})}/>
                    </div>

                    <button className="btn btn-danger" type="submit">Salvar Cadastro</button>

                </form>

            </div>


        </>
  )
}

export default Reserva