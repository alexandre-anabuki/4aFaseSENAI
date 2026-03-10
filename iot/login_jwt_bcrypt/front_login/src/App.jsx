import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cadastro from "./components/Cadastro"
import Login from "./components/Login"
import EsqueciSenha from "./components/EsqueciSenha"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path ="/cadastro" element={<Cadastro/>} />
          <Route path ="/login" element={<Login/>}/>
          <Route path="/esqueci_senha" element={<EsqueciSenha/>}/>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
