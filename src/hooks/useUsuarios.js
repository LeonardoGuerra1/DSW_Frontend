import { BASE_URL, get, post } from "../api/constants"
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
    }
  }
}