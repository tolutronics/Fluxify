import { User } from "@/types/users";

import { Post } from "@/types/posts";
export const postsGetters = {
  post(state: any) {
    return (postId: string) => {
      console.log("passed id", postId);
      console.log(state.facePost);
      if (postId !== "face")
        return state.posts.find((post: Post) => post.id === postId);
      else return state.facePost;
    };
  },
  posts(state: any) {
    return state.posts;
  },
  facePosts(state: any) {
    return state.facePost;
  },
  posterName(state: any) {
    return (post: Post) => {
      const user: User = state.users.find(
        (person: User) => person.matric === post.userId
      );
      const name = user.firstname + " " + user.lastname;
      return name;
    };
  },
  posterImage(state: any) {
    return (post: Post) => {
      const user = state.users.find(
        (person: User) => person.matric === post.userId
      );
      return user.photourl;
    };
  },
};
