import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useClientes } from "../hooks/useClientes"
import FiltersClientes from "../components/clientes/FiltersClientes";
import ExportExcelButton from "../xls/ExportExcelButton";


function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [distritos, setDistritos] = useState([]);
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

  return (
    <>
      <h1 className="text-4xl font-semibold text-center mb-7">
        Lista de clientes
      </h1>

      <div className="w-[1000px] mx-auto">
        <FiltersClientes setClientes={setClientes} clearFilters={setFullClientes} distritos={distritos} />
        <ExportExcelButton data={clientes} fileName={"clientes"} />

        {/* <div className="mb-5 flex justify-start items-center">
          <Link
            to={"/cards"}
            className="w-60 py-2 text-white text-center text-xl rounded-md outline-none bg-amber-700 hover:bg-amber-600 duration-75"
          >
            Ver productos
          </Link>
        </div> */}

        <table className="w-full rounded-md overflow-hidden">
          <thead>
            <tr className="text-white bg-orange-400">
              {/* <th className="py-1 w-[40px]">
                #
              </th> */}
              <th className="py-1 w-[130px]">
                Nombres
              </th>
              <th className="w-[100px]">
                Apellidos
              </th>
              <th className="w-[170px]">
                Correo
              </th>
              <th className="w-[130px]">
                Teléfomo
              </th>
              <th className="w-[100px]">
                Distrito
              </th>
              <th className="">
                Producto
              </th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ClientesPage;