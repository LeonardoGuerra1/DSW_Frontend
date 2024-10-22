import { lazy } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { Navigate } from "react-router-dom"
import { Suspense } from "react"

function App() {

  const LoginPage = lazy(() => import("./pages/LoginPage"))
  const ProductosPage = lazy(() => import("./pages/ProductosPage"))
  const RegistroPage = lazy(() => import("./pages/RegistroPage"))
  const ClientesPage = lazy(() => import("./pages/ClientesPage"))

  return (
    <>
      <Suspense fallback="...">
        <Router>
          <div className="mb-5 w-full h-5 rounded-b-lg bg-gray-500/40 shadow-lg shadow-gray-400/50"></div>
          <div className="container mx-auto">
            <Routes>
              <Route path="/" index element={<Navigate to={"/productos"} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/productos" element={<ProductosPage />} />
              <Route path="/registro" element={<RegistroPage />} />
              <Route path="/clientes" element={<ClientesPage />} />
            </Routes>
          </div>
        </Router>
      </Suspense>
    </>
  )
}

export default App
