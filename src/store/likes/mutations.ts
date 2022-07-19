import { Like } from "@/types/like";

export const likesMutations = {
  setUserLikes(state: any, likes: Like[]) {
    state.likes = likes;
  },

  updateLike(state: any, like: Like) {
    const newArr = [];
    for (const property in state.news) {
      newArr.push(state.news[property]);
    }

    newArr.push(like);

    state.likes = newArr;
  },

  removeLike(state: any, like: Like) {
    state.likes = state.likes.filter((element: Like) => element.id !== like.id);
  },
};
