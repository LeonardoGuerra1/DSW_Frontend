import { Alert, Dialog, MenuItem, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useProductos } from "../../hooks/useProductos";
import { useClientes } from "../../hooks/useClientes";
import CircularProgress from '@mui/material/CircularProgress';

const defaultValues = {
  nombre: "",
  apellido: "",
  correo: "",
  telefono: "",
  distrito: "",
  producto: ""
}

const required = {
  value: true,
  message: "Campo requerido."
}

const emailRegex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
const phoneRegex = /^(9\d{8})$/

function UpdateClienteDialog({ open, handleClose, cliente, updateClientes }) {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    defaultValues
  })
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    success: false,
    message: ""
  });

  const [productos, setProductos] = useState([]);
  const { getProductos } = useProductos()
  useEffect(() => {
    getProductos()
    .then(res => {
      setProductos([...res])
    })
  }, []);

  const { updateCliente } = useClientes()
  const onSubmit = async (data) => {
    setLoading(true)
    const body = {
      id_cliente: cliente.id_cliente,
      ...data
    }

    const result = await updateCliente(JSON.stringify(body))
    setLoading(false)
    if (result.object === null) {
      setAlert({
        show: true,
        success: false,
        message: result.mnesaje || "Error interno"
      })
    } else {
      setAlert({
        show: true,
        success: true,
        message: result.mnesaje
      })
      setTimeout(() => {
        handleClose()
        updateClientes(cliente.id_cliente, result.object)
        setAlert({
          show: false,
          success: false,
          message: ""
        })
      }, 2000)
    }
  }

  useEffect(() => {
    if (open) {
      setValue("nombre", cliente.nombre)
      setValue("apellido", cliente.apellido)
      setValue("correo", cliente.correo)
      setValue("telefono", cliente.telefono)
      setValue("distrito", cliente.distrito)
      setValue("producto", cliente.producto)
    } else {
      reset()
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <div className="w-full p-5">
          <p className="text-2xl text-center font-semibold">
            Editar cliente
          </p>

          <form action="" onSubmit={handleSubmit(onSubmit)} className="w-[712px] mx-auto mt-5 flex flex-wrap justify-start items-start gap-3">
            <TextField
              label="Nombres"
              className="w-[350px]"
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
              className="w-[350px]"
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
              className="w-[350px]"
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
              className="w-[350px]"
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
              className="w-[350px]"
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
              // value={distrito}
              onChange={(e) => setValue("producto", e.target.value)}
              select
              defaultValue={cliente.producto}//CAMBIAR DE ACUERDO AL CLIENTE SELECCIONADO
            >
              {productos.map(item => (
                <MenuItem key={item.id_producto} value={item.nombreProducto}>
                  {item.nombreProducto}
                </MenuItem>
              ))}
            </TextField>

            {alert.show && (
              <Alert severity={alert.success ? "success" : "error"}>
                {alert.message}
              </Alert>
            )}

            <button
              className="w-full py-2 text-white flex justify-center items-center gap-x-2 rounded-md outline-none bg-orange-500 hover:bg-orange-400 duration-75 disabled:grayscale-[60%]"
              type="submit"
              disabled={loading || alert.success}
            >
              Actualizar
              {loading && <CircularProgress size={20} thickness={8} color="inherit" />}
            </button>
          </form>
        </div>
      </Dialog>
    </>
  );
}

export default UpdateClienteDialog;