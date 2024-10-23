import { useEffect } from "react";
import { useState } from "react";
import { useClientes } from "../hooks/useClientes"
import FiltersClientes from "../components/clientes/FiltersClientes";
import ExportExcelButton from "../xls/ExportExcelButton";
import { userStore } from "../store/userStore";
import { Navigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateClienteDialog from "../components/clientes/UpdateClienteDialog";
import DeleteClienteDialog from "../components/clientes/DeleteClienteDialog";

function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [selected, setSelected] = useState({});
  const { getClientes } = useClientes()
  useEffect(() => {
    setFullClientes()
  }, []);

  const setFullClientes = () => {
    getClientes()
    .then(res => {
      setClientes([...res])
      let list = []
      res.forEach(item => {
        if (!list.some(i => i.nombre === item.distrito)) 
          list.push({
            id: list.length === 0 ? 1 : (list.length + 1),
            nombre: item.distrito
          })
      })
      setDistritos(list)
    })
  }

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = (index) => {
    setSelected(clientes[index])
    setOpenUpdate(true)
  }

  const handleCloseUpdate = () => {
    setOpenUpdate(false)
    setTimeout(() => {
      setSelected({})
    }, 300)
  }

  const updateOnClientes= (id, item) => {
    const index = clientes.findIndex(i => i.id_cliente === id)
    let lista = [...clientes]
    lista[index] = item
    setClientes([...lista])
  }

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (index) => {
    setSelected(clientes[index])
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
    setTimeout(() => {
      setSelected({})
    }, 300)
  }

  const deleteOnClientes= (id) => {
    setClientes(clientes.filter(item => item.id_cliente !== id))
  }

  const { logged } = userStore()
  if (!logged) {
    return <Navigate to={"/productos"} />
  }

  return (
    <>
      <h1 className="text-4xl font-semibold text-center mb-7">
        Lista de clientes
      </h1>

      <div className="w-[1000px] mx-auto">
        {clientes.length > 0 ? (
          <>
            <FiltersClientes setClientes={setClientes} clearFilters={setFullClientes} distritos={distritos} />
            <ExportExcelButton data={clientes} fileName={"clientes"} />
    
            <table className="w-full rounded-md overflow-hidden">
              <thead>
                <tr className="text-white bg-orange-400">
                  {/* <th className="py-1 w-[40px]">
                    #
                  </th> */}
                  <th className="py-1 w-[120px]">
                    Nombres
                  </th>
                  <th className="w-[120px]">
                    Apellidos
                  </th>
                  <th className="w-[180px]">
                    Correo
                  </th>
                  <th className="w-[120px]">
                    Teléfomo
                  </th>
                  <th className="w-[170px]">
                    Distrito
                  </th>
                  <th className="">
                    Producto
                  </th>
                  <th className="px-8"></th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((item, index) => (
                  <tr key={item.id_cliente} className={`text-center ${index % 2 === 0 ? "bg-orange-100/40" : "bg-white"}`}>
                    {/* <td className="py-5">
                      {index + 1}
                    </td> */}
                    <td className="py-5">
                      {item.nombre}
                    </td>
                    <td>
                      {item.apellido}
                    </td>
                    <td>
                      {item.correo}
                    </td>
                    <td>
                      {item.telefono}
                    </td>
                    <td>
                      {item.distrito}
                    </td>
                    <td>
                      {item.producto}
                    </td>
                    <td>
                      <button onClick={() => handleOpenUpdate(index)}>
                        <EditIcon />
                      </button>
                      <button onClick={() => handleOpenDelete(index)}>
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <UpdateClienteDialog open={openUpdate} handleClose={handleCloseUpdate} cliente={selected} updateClientes={updateOnClientes} />
            <DeleteClienteDialog open={openDelete} handleClose={handleCloseDelete} cliente={selected} deleteClientes={deleteOnClientes} />
          </>
        ) : (
          <p className="text-xl text-center">
            No existen clientes registrados.
          </p>
        )}
      </div>
    </>
  );
}

export default ClientesPage;