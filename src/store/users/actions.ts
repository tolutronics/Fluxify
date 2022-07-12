import { getAllUsers } from "@/services/firebaseService";
import store from "..";

import { onSnapshot } from "firebase/firestore";

export const usersActions = {
  async users({ commit }: any) {
    const data = await getAllUsers();
    onSnapshot(data, async (snapshot: any) => {
      const users: any = [];
      snapshot.docChanges().forEach(async (change: any) => {
        if (change.type === "added") {
          // console.log("New city: ", change.doc.data());
          users.push(change.doc.data());
        }
        if (change.type === "modified") {
          console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed city: ", change.doc.data());
        }
      });
      commit("setUsers", users);
      store.dispatch("posts");
    });
  },
};
