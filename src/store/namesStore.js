import axios from "axios";
import create from "zustand";

const useStoreName = create((set) => ({
  nameList: sessionStorage.getItem("soldierNames")
    ? JSON.parse(sessionStorage.getItem("soldierNames"))
    : [],
  setNameList: (nameList) => set({ nameList }),
  name: "",
  setName: (name) => set({ name }),
  id: "",
  setId: (id) => set({ id }),
}));

export { useStoreName };
