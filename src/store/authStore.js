import axios from "axios";
import create from "zustand";

const useStoreAuth = create((set) => ({
  auth: JSON.parse(sessionStorage.getItem("userInfo")),
  setAuth: (auth) => set({ auth }),
}));

export { useStoreAuth };
