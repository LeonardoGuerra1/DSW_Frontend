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
  const CardsPage = lazy(() => import("./pages/CardsPage"))
  const FormPage = lazy(() => import("./pages/FormPage"))
  const QueriesPage = lazy(() => import("./pages/QueriesPage"))

  return (
    <>
      <Suspense fallback="...">
        <Router>
          <div className="mb-5 w-full h-5 rounded-b-lg bg-gray-500/40 shadow-lg shadow-gray-400/50"></div>
          <div className="container mx-auto">
            <Routes>
              <Route path="/" index element={<Navigate to={"/login"} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cards" element={<CardsPage />} />
              <Route path="/form" element={<FormPage />} />
              <Route path="/queries" element={<QueriesPage />} />
            </Routes>
          </div>
        </Router>
      </Suspense>
    </>
  )
}

export default App
