import { lazy } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { Navigate } from "react-router-dom"
import { Suspense } from "react"
import Navbar from "./components/navbar/Navbar"

function App() {

  const LoginPage = lazy(() => import("./pages/LoginPage"))
  const ProductosPage = lazy(() => import("./pages/ProductosPage"))
  const RegistroPage = lazy(() => import("./pages/RegistroPage"))
  const ClientesPage = lazy(() => import("./pages/ClientesPage"))

  return (
    <>
      <Suspense fallback="...">
        <Router>
          <Navbar />
          <div className="relative">
            <div className="container mt-5 mx-auto pb-10">
              <Routes>
                <Route path="/*" index element={<Navigate to={"/productos"} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/productos" element={<ProductosPage />} />
                <Route path="/registro/:id" element={<RegistroPage />} />
                <Route path="/clientes" element={<ClientesPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </Suspense>
    </>
  )
}

export default App
