import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      usuario: {},
      logged: false,
      setUsuario: (usuario) => set({ usuario }),
      setLogged: (value) => set({ logged: value })
    }), {
      name: "user"
    }
  )
)