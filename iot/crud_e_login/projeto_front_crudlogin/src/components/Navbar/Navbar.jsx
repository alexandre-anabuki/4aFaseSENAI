import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <Link className='' to="/">Home</Link>

        <Link className='' to="">Produto</Link>
        <Link className='' to="/produto/">Listar Produto</Link>
        <Link className='' to="/produto/cadastro">Cadastrar Produto</Link>

        <Link className='' to="">Usuario</Link>
        <Link className='' to="/usuario/">Listar Usuario</Link>
        <Link className='' to="/usuario/cadastro">Cadastrar Usuario</Link>
    </nav>
  )
}

export default Navbar