import './App.css'
import Home from './components/Home/home'
import Login from './components/Login/login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login />
      <Home />
    </>
  )
}

export default App
