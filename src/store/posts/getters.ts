import { User } from "@/types/users";

import { Post } from "@/types/posts";
export const postsGetters = {
  post(state: any) {
    return (postId: string) => {
      if (postId !== "face") {
        // console.log(postId);
        // console.log(state.posts);
        const result = state.posts.find((item: Post) => {
          if (item.id == Number(postId)) return item;
        });
        return result;
      } else {
        return state.facePost;
      }
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
        (person: User) => person.studentId === post.studentId
      );
      const name = user.firstname + " " + user.lastname;
      return name;
    };
  },
  posterImage(state: any) {
    return (post: Post) => {
      const user = state.users.find(
        (person: User) => person.studentId === post.studentId
      );
      return user.photoUrl;
    };
  },
};
