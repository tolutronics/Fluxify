import { Post } from "@/types/posts";

export const postsActions = {
  async posts({ commit }: any, posts: Post) {
    commit("setPosts", posts);
  },
};
