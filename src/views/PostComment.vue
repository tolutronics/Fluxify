<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button
            :icon="arrowBackOutline"
            :text="''"
            :default-href="'/'"
          ></ion-back-button>
        </ion-buttons>
        <ion-title>Post</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <SubPostCard :post="post" :face="true" v-if="postId == 'face'" />
      <SubPostCard :post="post" :face="false" v-else />
      <CommentCard
        v-show="!loading"
        v-for="comment of comments"
        :key="comment.id"
        :comment="comment"
      />
      <ion-spinner name="circular" v-show="loading"></ion-spinner>
      <ion-infinite-scroll threshold="25%" @ionInfinite="loadData($event)">
        <ion-infinite-scroll-content
          loadingSpinner="bubbles"
          loadingText="Loading more data..."
        >
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <InputBox @getInput="commentPost" />
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import CommentCard from "@/components/CommentCard.vue";
// import PostCard from "@/components/PostCard.vue";
import InputBox from "@/components/InputBox.vue";
import { arrowBackOutline } from "ionicons/icons";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import commonIonicComponents from "@/shared/common-ionic-components";
import SubPostCard from "@/components/SubPostCard.vue";
import { getPost } from "@/shared/data.service";
import {
  commentOnPost,
  getPostComments,
  getSession,
} from "@/services/supabase/supabaseClient";
import { createToast } from "mosha-vue-toastify";

export default defineComponent({
  name: "Home",
  components: {
    CommentCard,
    // PostCard,
    InputBox,
    ...commonIonicComponents,
    SubPostCard,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    //  const router = useRouter();
    //store.dispatch("news");
    const loading = ref(false);
    const comments = ref();
    const currentUser = ref();
    const postId = route.params.uuid;
    const post: any = getPost();
    getSession().then((res) => {
      console.log(res);
      currentUser.value = res;
    });
    const loadData = (ev: any) => {
      setTimeout(() => {
        ev.target.complete();
        // posts.value.push(2, 3, 5);
      }, 1000);
    };

    const commentPost = async (ev: any) => {
      const result = await commentOnPost({
        studentId: currentUser.value.user.id,
        studentNumber: currentUser.value.user.user_metadata.studentNumber,
        photoUrl: null,
        postText: ev,
        postId: post.id,
      });

      if (!result.error) {
        createToast("Reply sent");
        comments.value.push(result.data[0]);
      }
    };

    const getComments = async () => {
      loading.value = true;
      const result = await getPostComments(post.id);
      loading.value = false;
      console.log(result);
      if (!result.error) {
        comments.value = result.data;
      }
    };

    getComments();
    return {
      arrowBackOutline,
      loadData,
      commentPost,
      loading,
      comments,
      postId,
      post,
    };
  },
});
</script>

<style scoped>
ion-toolbar {
  --padding-start: 10px;
  --padding-end: 10px;
  --padding-top: 10px;
  --background: transparent;
  --padding-bottom: 0;
}
img.simg {
  float: left;
  width: 35px;
  height: 35px;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 100%;
}
ion-toolbar > a > ion-icon {
  font-size: 25px;
  position: relative;
}
ion-spinner {
  position: absolute;
  left: 0;
  right: 0;
  margin: 20px auto;
}
</style>
