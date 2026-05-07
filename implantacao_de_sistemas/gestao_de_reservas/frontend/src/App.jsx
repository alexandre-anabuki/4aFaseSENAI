import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import CadastroCliente from "./components/CadastroCliente"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/cadastrarCliente" element={<CadastroCliente/>}/>
          <Route path="menuReserva"/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
