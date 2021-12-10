import { getAllUsers } from "@/services/firebaseService";
import store from "..";

export const usersActions = {
  async users({ commit }: any) {
    let users: any = [];
    const data = await getAllUsers();
    data.onSnapshot((query) => {
      const newUsers: any = [];
      query.forEach((doc) => {
        newUsers.push(doc.data());
      });
      users = newUsers;
      commit("setUsers", users);
      store.dispatch("posts");
    });
  },
};
