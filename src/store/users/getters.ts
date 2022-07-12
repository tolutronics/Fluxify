import { User } from "./../../types/Users";
export const usersGetters = {
  user(state: any) {
    return (matric: string) => {
      const user = state.users.find((user: User) => user.matric === matric);

      return user;
    };
  },

  users(state: any) {
    console.log(state.users);
    return state.users;
  },
  currentUser(state: any) {
    return state.currentUser;
  },
};
