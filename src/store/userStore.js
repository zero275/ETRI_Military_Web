import create from "zustand";

const useStoreUser = create((set) => ({
  userList: sessionStorage.getItem("userlist")
    ? JSON.parse(sessionStorage.getItem("userlist"))
    : [],
  setUserList: (userList) => set({ userList }),
}));

export { useStoreUser };
