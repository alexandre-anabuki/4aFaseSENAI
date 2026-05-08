import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import CadastroCliente from "./components/CadastroCliente"
import Quarto from "./components/Quarto"
import Reserva from "./components/Reserva"
import CadastroFuncionario from "./components/CadastroFuncionario"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/cadastrarCliente" element={<CadastroCliente/>}/>
          <Route path="/cadastrarFuncionario" element={<CadastroFuncionario/>}/>
          <Route path="/cadastrarQuarto" element={<Quarto/>}/>
          <Route path="/menuReserva" element={<Reserva/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
