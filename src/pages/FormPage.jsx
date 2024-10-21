import { TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const defaultValues = {
  nombres: "",
  apellidos: "",
  empresa: "",
  correo: "",
  celular: "",
  detalle: "",
  archivo: ""
}

const required = {
  value: true,
  message: "Campo requerido."
}

const emailRegex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
const phoneRegex = /^(9\d{8})$/

function FormPage() {
  const { register, handleSubmit, formState: { errors, isSubmitted }, setValue, setError, clearErrors } = useForm({
    defaultValues
  })

  const navigate = useNavigate()
  const onSubmit = (data) => {
    console.log(data);
    navigate("/queries")
  }

  const archivo = register("archivo", {
    required,
    validate: (value) => {
      return value.length > 0 || "Campo requerido DAAA."
    }
  })

  const handleChangeFile = (e) => {
    setValue("archivo", e.target.files[0]?.name || "")
    if (e.target.files.length > 0) {
      clearErrors("archivo")
    } else if (isSubmitted) {
      setError("archivo", {
        message: "Campo requerido"
      })
    }
  }

  return (
    <>
      <div className="w-[880px] mx-auto mt-10 p-10 rounded-md bg-[#EDE8E0]">
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
              {...register("nombres", {
                required
              })}
              error={errors.nombres ? true : false}
              helperText={errors.nombres?.message}
            />

            <TextField
              label="Apellidos"
              className="w-[389px]"
              slotProps={{
                input: { className: "bg-white" }
              }}
              {...register("apellidos", {
                required
              })}
              error={errors.apellidos ? true : false}
              helperText={errors.apellidos?.message}
            />

            <TextField
              label="Empresa"
              className="w-[389px]"
              slotProps={{
                input: { className: "bg-white" }
              }}
              {...register("empresa", {
                required
              })}
              error={errors.empresa ? true : false}
              helperText={errors.empresa?.message}
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
              label="Celular"
              className="w-[389px]"
              {...register("celular", {
                required,
                validate: (value) => phoneRegex.test(value) || "Celular inválido."
              })}
              slotProps={{
                input: { className: "bg-white" }
              }}
              error={errors.celular ? true : false}
              helperText={errors.celular?.message}
            />

            <TextField
              label="Detalla tu solicitud"
              className="w-full"
              slotProps={{
                input: { className: "bg-white" }
              }}
              {...register("detalle", {
                required
              })}
              error={errors.detalle ? true : false}
              helperText={errors.detalle?.message}
              multiline
              minRows={4}
              maxRows={7}
              />

            <TextField
              className="w-full"
              // label="Archivo adjunto"
              name={archivo.name}
              slotProps={{
                input: { className: "bg-white", required: archivo.required },
              }}
              error={errors.archivo ? true : false}
              helperText={errors.archivo?.message}
              onChange={handleChangeFile}
              type="file"
            />

            <div className="w-full flex justify-center gap-x-5 items-center">
              <button
                className="w-60 py-2 text-white text-xl rounded-md outline-none bg-orange-500 hover:bg-orange-400 duration-75"
                type="submit"
              >
                Enviar
              </button>
              <Link
                to={"/cards"}
                className="w-60 py-2 text-white text-center text-xl rounded-md outline-none bg-gray-500/80 hover:bg-gray-400 duration-75"
                type="button"
              >
                Cancelar
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormPage;