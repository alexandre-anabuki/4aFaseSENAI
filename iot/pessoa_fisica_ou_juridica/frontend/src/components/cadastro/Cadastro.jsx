import React from 'react'
import { useState } from 'react'

function Cadastro() {
  return (
    <>
    
    <div className='formulario'>
        <label htmlFor="text">Nome do usuario</label>
        <input type='text' name="id" placeholder='Nome completo' />

        <label htmlFor="text">Email</label>
        <input type='email' name="email-cadastro" placeholder='usuario@email.com' />

        <label htmlFor="text">Senha</label>
        <input type='password' name="isenha-cadastro" placeholder='********' />
    </div>
    </>
  )
    
}

export default Cadastro