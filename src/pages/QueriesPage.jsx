import { Link } from "react-router-dom";

const list = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  }
]

function QueriesPage() {
  return (
    <>
      <h1 className="text-4xl font-semibold text-center mb-7">
        Lista de consultas
      </h1>

      <div className="w-[1000px] mx-auto">
        <div className="mb-5 flex justify-start items-center">
          <Link
            to={"/cards"}
            className="w-60 py-2 text-white text-center text-xl rounded-md outline-none bg-amber-700 hover:bg-amber-600 duration-75"
          >
            Ver productos
          </Link>
        </div>

        <table className="rounded-md overflow-hidden">
          <thead>
            <tr className="text-white bg-orange-400">
              {/* <th className="py-1 w-[40px]">
                #
              </th> */}
              <th className="py-1 w-[130px]">
                Empresa
              </th>
              <th className="">
                Descripcion
              </th>
              <th className="w-[170px]">
                Correo
              </th>
              <th className="w-[130px]">
                Teléfomo
              </th>
              <th className="w-[100px]">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={item.id} className={`text-center ${index % 2 === 0 ? "bg-orange-100/40" : "bg-white"}`}>
                {/* <td className="py-5">
                  {index + 1}
                </td> */}
                <td className="py-5">
                  Empresa
                </td>
                  <td>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet ducimus qui assumenda excepturi. Aut voluptate porro delectus!
                </td>
                <td>
                  correo@gmail.com
                </td>
                <td>
                  {987654321}
                </td>
                <td className="font-semibold">
                  {true ? "Activo" : "Inactivo"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default QueriesPage;