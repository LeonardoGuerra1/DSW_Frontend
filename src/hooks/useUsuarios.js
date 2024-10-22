import { BASE_URL, deleteU, get, post } from "../api/constants"
export const useUsuarios = () => {

  return {
    getUsuarios: async () => {
      const [data, error] = await get(`${BASE_URL}/usuario/listarUsuarios`)
      if (error) {
        console.log(error);
        return []
      }
      return [...data]
    },

    login: async (body) => {
      const [data, error] = await post(`${BASE_URL}/usuario/login`, body)
      if (error) {
        console.log(error);
        return {}
      }
      return data
    },

    saveUsuario: async (body) => {
      const [data, error] = await post(`${BASE_URL}/usuario/registrarUsuario`, body)
      if (error) {
        console.log(error);
        return {}
      }
      return data
    },

    updateUsuario: async (body) => {
      const [data, error] = await post(`${BASE_URL}/usuario/actualizarUsuario`, body)
      if (error) {
        console.log(error);
        return {}
      }
      return data
    },

    deleteUsuario: async (id) => {
      const [data, error] = await deleteU(`${BASE_URL}/usuario/eliminarUsuario/${id}`)
      if (error) {
        console.log(error);
        return {}
      }
      return data
    }
  }
}