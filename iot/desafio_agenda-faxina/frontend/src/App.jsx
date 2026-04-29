import { BrowserRouter, Route, Routes } from "react-router-dom"
import CadastroCliente from "./components/CadastroCliente"
import Login from "./components/Login"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path ="/cadastro" element={<CadastroCliente/>} />
          <Route path ="/login" element={<Login/>}/>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
