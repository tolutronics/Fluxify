import { User } from "../../types/users";
export const usersMutations = {
  setUsers(state: any, users: User[]) {
    state.users = users;
  },
  setCurrentUser(state: any, studentId: string) {
    state.currentUser = state.users.find((x: User) => x.studentId == studentId);
  },
};
