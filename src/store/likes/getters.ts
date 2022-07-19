import { Like } from "@/types/like";
export const likesGetters = {
  likes(state: any) {
    console.log(state.likes);
    return state.likes;
  },

  isLiked(state: any) {
    return (postId: any) => {
      if (
        state.likes.findIndex(
          (element: Like) =>
            element.postId === postId &&
            element.studentId == state.currentUser.studentId
        ) === -1
      ) {
        return false;
      } else {
        return true;
      }
    };
  },
};
