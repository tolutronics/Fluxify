import { Like } from "@/types/like";
import { Post } from "@/types/posts";
import { User } from "@/types/users";
import { createStore } from "vuex";

import { postsGetters } from "./posts/getters";
import { usersGetters } from "./users/getters";
import { likesGetters } from "./likes/getters";

import { postsMutations } from "./posts/mutations";
import { usersMutations } from "./users/mutations";
import { likesMutations } from "./likes/mutations";

import { postsActions } from "./posts/actions";
import { usersActions } from "./users/actions";
import { likesActions } from "./likes/actions";

const store = createStore({
  state: {
    posts: [] as Post[],
    users: [] as User[],
    likes: [] as Like[],
  },
  getters: {
    ...postsGetters,
    ...usersGetters,
    ...likesGetters,
  },
  mutations: {
    ...postsMutations,
    ...usersMutations,
    ...likesMutations,
  },
  actions: {
    ...postsActions,
    ...usersActions,
    ...likesActions,
  },
});

export default store;

export type State = typeof store;
