import { Post } from "@/types/posts";

export const postsMutations = {
  setPosts(state: any, posts: Post[]) {
    state.posts = posts;
  },
  setFacePost(state: any, facePost: Post) {
    state.facePost = facePost;
  },
  addPosts(state: any, posts: Post[]) {
    const newArr = [];
    for (const property in state.posts) {
      newArr.push(state.posts[property]);
    }
    posts.forEach((item) => {
      newArr.unshift(item);
    });
    state.posts = newArr;
  },
};
