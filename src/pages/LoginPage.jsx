import { useEffect, useState } from "react";
import { Alert, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUsuarios } from "../hooks/useUsuarios";
import CircularProgress from '@mui/material/CircularProgress';
import background from "../assets/images/backgrounds/edificios_contrapicado.jpg"
import { useNavigate } from "react-router-dom";

const defaultValues = {
  usuario: "",
  contrasenia: ""
}

const required = {
  value: true,
  message: "Campo requerido."
}

function LoginPage() {
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues
  })
  const { login } = useUsuarios()
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    success: false,
    message: ""
  });
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true)
    setAlert({
      show: false,
      success: false,
      message: ""
    })

    const body = {
      usuario: data.usuario,
      password: data.contrasenia
    }

    const result = await login(JSON.stringify(body))
    if (result.codigo !== "00") {
      setAlert({
        show: true,
        success: false,
        message: result.mensaje
      })
    } else {
      setAlert({
        show: true,
        success: true,
        message: result.mensaje
      })
      setTimeout(() => {
        navigate("/queries")
      }, 2000)
    }

    setLoading(false)
  }

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center">
        <div className="w-full h-full absolute left-0 top-0">
          <img src={background} alt="Fondo" className="w-full h-full blur-lg grayscale-[60%] z-0" />
        </div>
        <div className="w-[500px] bg-white border rounded-md shadow-xl z-10">
          <div className="border-b-2 p-4 flex justify-center items-center">
            <span className="text-2xl font-semibold">
              Login
            </span>
          </div>

          <div className="w-5/6 mt-3 mb-10 mx-auto">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Usuario"
                className="w-full"
                {...register("usuario", {
                  required
                })}
                error={errors.usuario ? true : false}
                helperText={errors.usuario?.message}
                margin="normal"
              />

              <TextField
                label="Contraseña"
                className="w-full"
                {...register("contrasenia", {
                  required
                })}
                error={errors.contrasenia ? true : false}
                helperText={errors.contrasenia?.message}
                margin="normal"
                type="password"
              />

              {alert.show && (
                <Alert severity={alert.success ? "success" : "error"}>
                  {alert.message}
                </Alert>
              )}

              <button
                className="w-full mt-2 py-2 text-xl text-white flex justify-center items-center gap-x-2 rounded-md bg-amber-700 hover:bg-amber-600 duration-100 disabled:grayscale-[60%]"
                disabled={loading || alert.success}
              >
                Ingresar
                {loading && <CircularProgress size={20} thickness={8} color="inherit" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;