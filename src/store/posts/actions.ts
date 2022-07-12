import { Post } from "@/types/posts";
import store from "..";
import { getAllPosts } from "@/services/firebaseService";
import { onSnapshot } from "firebase/firestore";

export const postsActions = {
  async posts({ commit }: any) {
    const data = await getAllPosts();
    const posts: any = [];
    onSnapshot(data, async (snapshot: any) => {
      snapshot.docChanges().forEach(async (change: any) => {
        if (change.type === "added") {
          posts.push(change.doc.data());
          commit("setPosts", posts);
        }
        if (change.type === "modified") {
          const prevPost = store.getters.posts;
          const newPosts: any = [];
          prevPost.forEach((element: Post) => {
            if (element.id == change.doc.data().id) {
              element = change.doc.data();
            }
            newPosts.push(element);
          });
          commit("setPosts", newPosts);
        }
        if (change.type === "removed") {
          const prevPost = store.getters.posts;
          const newPosts: any = [];
          prevPost.forEach((element: Post) => {
            if (element.id == change.doc.data().id) {
              element = change.doc.data();
            }
            newPosts.push(element);
          });
          commit("setPosts", newPosts);
        }
      });
    });
  },
};
