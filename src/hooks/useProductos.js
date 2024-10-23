import { BASE_URL, get } from "../api/constants";

export const useProductos = () => {
  return {
    getProductos: async () => {
      const [data, error] = await get(`${BASE_URL}/producto/listarProducto`)
      if (error) {
        console.log(error);
        return []
      }      
      return [...data.object]
    },

    getProductoPorId: async (id) => {
      const [data, error] = await get(`${BASE_URL}/producto/buscarPorId/${id}`)
      if (error) {
        console.log(error);
        return {}
      }      
      return data
    }
  }
}