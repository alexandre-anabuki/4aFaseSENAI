import {Outlet} from "react-router-dom"
import Navbar from "./Navbar/Navbar"

const Layout = () => {
  return (
    <div>
        <Navbar />

        <div className="container mt-4">
            <Outlet />
        </div>
    </div>
  )
}

export default Layout