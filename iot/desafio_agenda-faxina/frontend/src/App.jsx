import { BrowserRouter, Route, Routes } from "react-router-dom"
import CadastroCliente from "./components/CadastroCliente"
import Agendamento from "./components/Agendamento"
import Logar from "./components/Logar"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path ="/cadastro" element={<CadastroCliente/>} />
          <Route path ="/login" element={<Logar/>}/>
          <Route paath="/agendamento" element={<Agendamento/>}/>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
