import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from "./components/Layout"
import Home from './page/Home'
import CadastroUsuario from './page/CadastroUsuario'
import Login from './page/Login'
import EsqueciSenha from './page/EsqueciSenha'
import CadastroProduto from './page/CadastroProduto'
import ListarProduto from './page/ListarProduto'
import ListarUsuario from './page/ListarUsuario'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}/>
            <Route index element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/usuario/cadastro' element={<CadastroUsuario/>}/>
            <Route path='/produto/cadastro' element={<CadastroProduto/>}/>
            <Route path='/produto' element={<ListarProduto/>}/>
            <Route path='/usuario' element={<ListarUsuario/>}/>
          <Route/>

        <Route path='/login' element={<Login/>}/><Route/>
        <Route path='/esqueciSenha' element={<EsqueciSenha/>}/><Route/>

        <Route path='*' element={<Error/>}></Route>

        </Routes>


      </BrowserRouter>
    </>
  )
}

export default App
