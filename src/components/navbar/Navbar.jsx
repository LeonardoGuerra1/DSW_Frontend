import { Link } from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { userStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { logged, setLogged } = userStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    setLogged(false)
    navigate("/productos")
  }
  const buttonClass = "px-5 py-1 text-lg rounded-lg font-semibold flex justify-center items-center gap-x-2 hover:bg-stone-900/30 duration-100"

  return (
    <>
      <nav className="w-full p-5 rounded-b-lg bg-gray-700/80 shadow-lg shadow-gray-400/50">
        <ul className="flex justify-center items-center gap-x-2 text-white">
          <li>
            <Link
              to={"/productos"}
              className={buttonClass}
            >
              Productos
              <BusinessCenterIcon />
            </Link>
          </li>

          {logged && (
            <li>
              <Link
                to={"/clientes"}
                className={buttonClass}
              >
                Clientes
                <GroupIcon />
              </Link>
            </li>
          )}

          {logged ? (
            <li>
              <button
                className={buttonClass}
                onClick={handleLogout}
              >
                Salir
                <LogoutIcon />
              </button>
            </li>
          ) : (
            <li>
              <Link
                to={"/login"}
                className={buttonClass}
              >
                Iniciar sesión
                <LoginIcon />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;