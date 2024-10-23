import { BASE_URL, deleteU, get, post } from "../api/constants";

export const useClientes = () => {
  return {
    getClientes: async () => {
      const [data, error] = await get(`${BASE_URL}/cliente/listarCliente`)
      if (error) {
        console.log(error);
        return []
      }      
      return [...data.object]
    },

    saveCliente: async (body) => {
      const [data, error] = await post(`${BASE_URL}/cliente/registrarCliente`, body)
      if (error) {
        console.log(error);
        return {}
      }
      return data
    },

    updateCliente: async (body) => {
      const [data, error] = await post(`${BASE_URL}/cliente/actualizarCliente`, body)
      if (error) {
        console.log(error);
        return {}
      }
      return data
    },

    deleteCliente: async (id) => {
      const [data, error] = await deleteU(`${BASE_URL}/cliente/eliminarCliente/${id}`)
      console.log({
        data,
        error
      });
      
      if (error) {
        console.log(error);
        return {}
      }
      return data
    },

    getClientesPorDistrito: async (distrito) => {
      const [data, error] = await get(`${BASE_URL}/cliente/listarPorDistrito/${distrito}`)
      if (error) {
        console.log({
          error,
          data
        });
        return false
      }
      return data
    },

    getClientesPorApellido: async (apellido) => {
      const [data, error] = await get(`${BASE_URL}/cliente/listarPorApellido/${apellido}`)
      if (error) {
        console.log({
          error,
          data
        });
        return false
      }
      return data
    }
  }
}