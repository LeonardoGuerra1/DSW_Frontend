import { Alert, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useClientes } from "../../hooks/useClientes";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from "react";

const initialMessages = {
  distrito: "",
  apellido: ""
}

function FiltersClientes({ setClientes, clearFilters, distritos }) {
  const [apellido, setApellido] = useState("");
  const [distrito, setDistrito] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(false);
  const { getClientesPorApellido, getClientesPorDistrito } = useClientes()

  const handleFilter = async () => {
    setLoading(true)
    setMessages(initialMessages)
    let newMessages = {...initialMessages}
    let filtering = false

    let porDistrito = []
    if (distrito !== "") {
      const selected = distritos[distrito - 1].nombre
      const result = await getClientesPorDistrito(selected)
      if (result.object === null) {
        newMessages.distrito = result.mnesaje
      } else {
        filtering = true
        porDistrito = [...result.object]
      }
    }

    let porApellido = []
    if (apellido.length > 0) {
      filtering = true
      const result = await getClientesPorApellido(apellido)
      if (result.object === null) {
        newMessages.apellido = result.mnesaje
      } else {
        filtering = true
        porApellido = [...result.object]
      }
    }

    if (!filtering) {
      setLoading(false)
      return
    }
    
    let list = []
    porApellido.forEach(item => {
      if (!list.some(i => i.id_cliente === item.id_cliente))
        list.push(item)
    })
    
    porDistrito.forEach(item => {
      if (!list.some(i => i.id_cliente === item.id_cliente))
        list.push(item)
    })
    
    setTimeout(() => {
      setMessages(newMessages)
      setClientes([...list])
      setLoading(false)
    }, 1000)
  }

  const handleClear = () => {
    setDistrito("")
    setApellido("")
    setMessages(initialMessages)
    clearFilters()
  }

  return (
    <>
      <div className="w-full mb-5 flex justify-between items-start">
        <div className="flex justify-start items-start gap-x-4">
          <div className="w-80 flex flex-col justify-start items-start">
            <TextField
              label="Buscar por distrito"
              className="w-full"
              value={distrito}
              onChange={(e) => setDistrito(e.target.value)}
              select
            >
              <MenuItem value="">---</MenuItem>
              {distritos.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nombre}
                </MenuItem>
              ))}
            </TextField>

            {messages.distrito !== "" && (
              <Alert severity="error" className="mt-3">
                {messages.distrito}
              </Alert>
            )}
          </div>

          <div className="w-80 flex flex-col justify-start items-start">
            <TextField
              label="Buscar por apellido"
              className="w-full"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
            
            {messages.apellido !== "" && (
              <Alert severity="error" className="mt-3">
                {messages.apellido}
              </Alert>
            )}
          </div>

          <button
            className="px-5 py-1 mt-2 text-white text-lg rounded-xl flex justify-center items-center gap-x-2 bg-cyan-700 hover:bg-cyan-600 disabled:grayscale-[70%]"
            onClick={handleFilter}
            disabled={loading}
          >
            {loading ? "Buscando" : "Buscar"}
            {loading && <CircularProgress size={20} thickness={8} color="inherit" />}
          </button>
        </div>

        <button
          className="px-5 py-1 mt-2 text-white text-lg rounded-xl bg-red-600 hover:bg-red-500 grayscale-[20%] disabled:grayscale-[70%]"
          onClick={handleClear}
          disabled={loading}
        >
          Limpiar filtros
        </button>
      </div>
    </>
  );
}
export default FiltersClientes;