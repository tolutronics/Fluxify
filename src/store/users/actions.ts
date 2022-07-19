import { User } from "@/types/users";

export const usersActions = {
  async users({ commit }: any, users: User) {
    commit("setUsers", users);
  },
};
