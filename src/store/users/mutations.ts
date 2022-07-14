import { User } from "../../types/users";
export const usersMutations = {
  setUsers(state: any, users: User[]) {
    state.users = users;
  },
  setCurrentUser(state: any, user: User) {
    state.currentUser = user;
  },
};
