import { Dialog, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useClientes } from "../hooks/useClientes"
import { useState } from "react"
import check from "../assets/images/icons/check.png"
import error from "../assets/images/icons/error.png"
import { useProductos } from "../hooks/useProductos"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

const defaultValues = {
  nombre: "",
  apellido: "",
  correo: "",
  telefono: "",
  distrito: "",
  producto: "",
}

const required = {
  value: true,
  message: "Campo requerido."
}

const emailRegex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
const phoneRegex = /^(9\d{8})$/

function RegistroPage() {
  const [producto, setProducto] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState({
    success: false,
    message: ""
  });
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues
  })

  const { id } = useParams()
  const { getProductoPorId } = useProductos()
  useEffect(() => {
    getProductoPorId(id)
    .then(res => {
      setValue("producto", res.object.nombreProducto)
      setProducto(res.object.nombreProducto)
    })
  }, []);

  const navigate = useNavigate()
  const { saveCliente } = useClientes()

  const onSubmit = async (data) => {
    setLoading(true)
    const result = await saveCliente(JSON.stringify(data))
    setResult({
      success: result.object !== null && result.object !== undefined,
      message: result.mnesaje || "Algo salió mal."
    })
    setOpen(true)
    setLoading(false)
  }
  
  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      setResult({
        success: false,
        message: ""
      })
      if (result.success) {
        navigate("/productos")
      }
    }, 300)
  }
  return (
    <>
      <div className="w-[880px] mx-auto mt-10 p-10 rounded-md bg-[#f5f2ed]">
        <span className="block w-full text-center text-2xl font-semibold text-white rounded-lg bg-orange-500 py-4">
          FORMULARIO DE REQUERIMIENTO
        </span>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mt-7 flex flex-wrap justify-between items-start gap-5">
            <TextField
              label="Nombres"
              className="w-[389px]"
              slotProps={{
                input: { className: "bg-white" }
              }}
              {...register("nombre", {
                required
              })}
              error={errors.nombre ? true : false}
              helperText={errors.nombre?.message}
            />

            <TextField
              label="Apellidos"
              className="w-[389px]"
              slotProps={{
                input: { className: "bg-white" }
              }}
              {...register("apellido", {
                required
              })}
              error={errors.apellido ? true : false}
              helperText={errors.apellido?.message}
            />

            <TextField
              label="Correo"
              className="w-[389px]"
              slotProps={{
                input: { className: "bg-white" }
              }}
              {...register("correo", {
                required,
                validate: (value) => emailRegex.test(value) || "Correo inválido."
              })}
              error={errors.correo ? true : false}
              helperText={errors.correo?.message}
            />

            <TextField
              label="Teléfono"
              className="w-[389px]"
              slotProps={{
                input: { className: "bg-white" }
              }}
              {...register("telefono", {
                required,
                validate: (value) => phoneRegex.test(value) || "Teléfono inválido."
              })}
              error={errors.telefono ? true : false}
              helperText={errors.telefono?.message}
            />
            
            <TextField
              label="Distrito"
              className="w-[389px]"
              {...register("distrito", {
                required,
              })}
              slotProps={{
                input: { className: "bg-white" }
              }}
              error={errors.distrito ? true : false}
              helperText={errors.distrito?.message}
            />

            <TextField
              label="Requerimiento"
              className="w-full"
              slotProps={{
                input: { className: "bg-white" }
              }}
              {...register("producto", {
                required
              })}
              value={producto}
              error={errors.producto ? true : false}
              helperText={errors.producto?.message}
            />

            <div className="w-full flex justify-center gap-x-5 items-center">
              <button
                className="w-60 py-2 text-white text-xl rounded-md outline-none bg-orange-500 hover:bg-orange-400 duration-75"
                type="submit"
              >
                Enviar
              </button>
              <Link
                to={"/productos"}
                className="w-60 py-2 text-white text-center text-xl rounded-md outline-none bg-gray-500/80 hover:bg-gray-400 duration-75"
                type="button"
              >
                Cancelar
              </Link>
            </div>
          </div>
        </form>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <div className="p-5">
          <img
            src={result.success ? check : error}
            alt="result"
            className={`${result.success ? "h-36" : "h-28"} mx-auto`}
          />
          <p className="text-2xl my-2 font-semibold text-center">
            {result.message}
          </p>
          <p className="text-center text-slate-600">
            {result.success
              ? "Pronto nuestro staff se comunicará con usted."
              : "Vuelve a intentarlo."}
          </p>
          <button
            className="w-full px-10 py-2 mt-5 text-lg text-white rounded-lg bg-blue-600 hover:bg-blue-500"
            onClick={handleClose}
          >
            Aceptar
          </button>
        </div>
      </Dialog>
    </>
  );
}

export default RegistroPage;