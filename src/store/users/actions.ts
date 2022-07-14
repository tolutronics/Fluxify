import store from "..";

export const usersActions = {
  async users({ commit }: any) {
    commit("setUsers", "users");
    store.dispatch("posts");
  },
};
