import { Link } from "react-router-dom";
import corporativos from "../assets/images/cards/art_corporativos.jpg"
import cuero_madera from "../assets/images/cards/art_cuero_madera.jpg"
import textil from "../assets/images/cards/art_textil.jpg"
import ecologicos from "../assets/images/cards/art_ecologicos.jpg"
import imprenta from "../assets/images/cards/art_imprenta.jpg"
import publicidad_exterior from "../assets/images/cards/art_publicidad.jpg"
import promocionales from "../assets/images/cards/art_promocionales.jpg"

const images = [corporativos, cuero_madera, textil, ecologicos, imprenta, publicidad_exterior, promocionales]
const list = [
  {
    id: 1,
    title: "Artículos Corporativos",
    description: "Set de vinos, power bank, bolsos, etc",
    // image: "art_corporativos.jpg"
  },
  {
    id: 2,
    title: "Artículos de Cuero y Madera",
    description: "Jenca, caja pisquera, portanotas, portavasos, porta tarjetero de cuero, etc.",
    // image: "art_cuero_madera.jpg"
  },
  {
    id: 3,
    title: "Artículos Textil",
    description: "Polos, casacas, uniformes, gorras, etc.",
    // image: "art_textil.jpg"
  },
  {
    id: 4,
    title: "Artículos Ecológicos",
    description: "Bolsas, libretas, lapiceros, mochilas, etc.",
    // image: "art_ecologicos.jpg"
  },
  {
    id: 5,
    title: "Artículos de Imprenta",
    description: "Libros, cuadernos, sobres, folders, etc.",
    // image: "art_imprenta.jpg"
  },
  {
    id: 6,
    title: "Artículos de Publicidad Exterior",
    description: "Banner, mochila móvil, gigantografías, etc.",
    // image: "art_publicidad_exterior.jpg"
  },
  {
    id: 7,
    title: "Artículos Promocionales",
    description: "Pines, cuadernos, llaveros, etc.",
    // image: "art_promocionales.jpg"
  }
]

function ProductosPage() {
  return (
    <>
      <h1 className="text-4xl font-semibold text-center mb-7">
        Nuestros productos
      </h1>

      <div className="w-full flex flex-wrap justify-center items-center gap-7">
        {list.map(item => (
          <div
            key={item.id}
            className="w-72 h-[430px] flex flex-col justify-between items-center overflow-hidden border-2 border-orange-500 rounded-lg shadow-xl shadow-stone-400/50 hover:-translate-y-1 duration-200"
          >
            <div className="w-full h-[45%]">
              <img
                src={images[item.id - 1]}
                alt=""
                className="w-full h-full border-0"
              />
            </div>

            <div className="w-full p-3 border-t-2 border-t-orange-500 flex flex-col justify-between flex-grow bg-[#ffefda]">
              <div className="">
                <p className="mb-2 text-center text-2xl font-semibold text-orange-500">
                  {item.title}
                </p>
                <p className="text-center font-semibold">
                  {item.description}
                </p>
              </div>
              <Link
                to={"/registro"}
                className="w-full py-2 font-semibold text-lg text-white text-center rounded-md bg-orange-500 outline-white hover:bg-orange-400 duration-75"
              >
                Cotizar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductosPage;