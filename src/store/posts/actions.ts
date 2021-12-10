import { getAllPosts } from "@/services/firebaseService";

export const postsActions = {
  async posts({ commit }: any) {
    let posts: any = [];
    const data = await getAllPosts();
    data.onSnapshot((query) => {
      const newPosts: any = [];
      query.forEach((doc) => {
        newPosts.push(doc.data());
      });
      posts = newPosts;
      commit("setPosts", posts);
    });
  },
};
