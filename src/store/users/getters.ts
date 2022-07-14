import { User } from "@/types/users";

export const usersGetters = {
  user(state: any) {
    return (matric: string) => {
      const user = state.users.find(
        (user: User) => user.studentNumber === matric
      );

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
