import { Alert, Dialog } from "@mui/material";
import { useState } from "react";
import { useClientes } from "../../hooks/useClientes";

function DeleteClienteDialog({ open, handleClose, cliente, deleteClientes }) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    success: false,
    message: ""
  });

  const { deleteCliente } = useClientes()
  const handleDelete = async () => {
    setLoading(true)

    const result = await deleteCliente(cliente.id_cliente)
    setLoading(false)
    
    if (result.object === null) {
      setAlert({
        show: true,
        success: false,
        message: result.mnesaje || "Error interno"
      })
    } else {
      console.log(result);
      setAlert({
        show: true,
        success: true,
        message: "Cliente eliminado correctamente."
      })
      setTimeout(() => {
        handleClose()
        deleteClientes(cliente.id_cliente)
        setAlert({
          show: false,
          success: false,
          message: ""
        })
      }, 2000)
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <div className="w-full p-5">
          <p className="text-center text-xl font-bold">
            ¿Desea eliminar el cliente {cliente.nombre} {cliente.apellido}?
          </p>

          {alert.show && (
            <Alert severity={alert.success ? "success" : "error"}>
              {alert.message}
            </Alert>
          )}

          <div className="mt-3 flex justify-center items-center gap-x-3">
            <button
              className="text-white px-5 py-1 rounded-lg bg-red-700 hover:bg-red-600 disabled:grayscale-[60%]"
              onClick={() => handleDelete()}
              disabled={loading || alert.success}
            >
              Eliminar
            </button>
            <button
              className="text-white px-5 py-1 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:grayscale-[60%]"
              onClick={handleClose}
              disabled={loading || alert.success}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default DeleteClienteDialog;