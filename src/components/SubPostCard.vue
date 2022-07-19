<template>
  <div id="container">
    <ion-row size="2" class="ion-padding-start ion-padding-end">
      <ion-avatar v-if="!face" class="ion-margin-end">
        <img v-if="posterImage" :src="posterImage" />
        <img v-else src="@/assets/male.png" />
      </ion-avatar>
      <ion-avatar v-else class="ion-margin-end">
        <img src="@/assets/male.png" />
        <!---admin image--->
      </ion-avatar>

      <ion-card-header>
        <div>
          <ion-card-subtitle class="ion-text-capitalize">{{
            formatDate(post.createdAt)
          }}</ion-card-subtitle>
          <ion-card-title v-if="face">
            <span>🎉🎉{{ post.title }}🎉🎉</span></ion-card-title
          >
          <ion-card-title v-if="!face">{{ posterName }} </ion-card-title>
        </div>
      </ion-card-header>
    </ion-row>

    <ion-row size="10" class="ion-padding-start ion-padding-end">
      <ion-card class="main">
        <ion-card-content>
          <p>
            {{ post.postText }}
          </p>

          <div class="imageContainer" v-if="post.photoUrl">
            <img :src="post.photoUrl" />
          </div>
        </ion-card-content>
        <ion-card lines="none" class="card-footer">
          <div>
            <ion-icon
              size="small"
              :icon="heartOutline"
              class="unlike"
              v-if="!isLiked"
              v-on:click="likeToggle"
              slot="start"
            ></ion-icon>
            <ion-icon
              size="small"
              :icon="heart"
              class="like"
              v-on:click="likeToggle"
              v-if="isLiked"
              slot="start"
            ></ion-icon>
            <span slot="start" class="likeCount">{{ likeCount }}</span>
          </div>

          <div>
            <ion-icon
              size="small"
              class="darktheme"
              :icon="shareSocial"
            ></ion-icon>
            <span class="likeCount">{{ commentCount }}</span>
          </div>

          <div>
            <ion-icon
              size="small"
              class="darktheme"
              :icon="chatbubbleOutline"
              slot="end"
            ></ion-icon>
            <span slot="end" class="likeCount">{{ commentCount }}</span>
          </div>
        </ion-card>
      </ion-card>
    </ion-row>
  </div>
</template>

<script lang="ts">
import {
  heartOutline,
  chatbubbleOutline,
  heart,
  shareSocial,
} from "ionicons/icons";

import { ref, defineComponent, computed, PropType, onMounted } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import { Post } from "@/types/posts";
import commonIonicComponents from "@/shared/common-ionic-components";
import {
  addLike,
  getCommentsCount,
  getLikesCount,
  getSession,
  removeLike,
} from "@/services/supabase/supabaseClient";
import { onIonViewDidEnter } from "@ionic/vue";
import { Like } from "@/types/like";
export default defineComponent({
  name: "Posts",
  props: {
    face: Boolean,
    post: {
      type: Object as PropType<Post>,
      default: {} as Post,
    },
  },
  components: {
    ...commonIonicComponents,
  },
  setup(props) {
    const isLiked = ref(false);
    const store = useStore();
    const commentCount = ref(0);
    const likeCount = ref(0);
    // console.log(props.post);

    const currentUser = computed(() => store.getters.currentUser);

    const likeToggle = async () => {
      console.log(isLiked.value);
      if (isLiked.value) {
        isLiked.value = false;
        likeCount.value--;
        const like = store.getters.likes.filter(
          (x: Like) =>
            x.postId == props.post.commentId || x.postId == props.post.postId
        );
        const result = await removeLike(like[0]);
        if (!result.error) {
          store.commit("removeLike", result.data[0]);
        }
      } else {
        likeCount.value++;
        isLiked.value = true;
        const likeData: Like = {
          studentId: currentUser.value.studentId,
          studentNumber: currentUser.value.studentNumber,
          postId: props.post.commentId || props.post.postId,
        };
        const result = await addLike(likeData);
        if (!result.error) {
          store.commit("updateLike", result.data[0]);
        }
      }
    };

    const formatDate = (date: any) => {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    };
    const posterName = computed(() => {
      return store.getters.posterName(props.post);
    });
    const posterImage = computed(() => {
      const image = store.getters.posterImage(props.post);

      return image;
    });
    const getCommentCount = computed(() => commentCount.value);

    const getLikeCount = computed(() => likeCount.value);

    onMounted(async () => {
      isLiked.value = store.getters.isLiked(
        props.post.commentId || props.post.postId
      );
      commentCount.value = await getCommentsCount(
        props.post.commentId || props.post.postId
      );
      likeCount.value = await getLikesCount(
        props.post.commentId || props.post.postId
      );
    });

    return {
      heartOutline,
      chatbubbleOutline,
      heart,
      shareSocial,
      posterName,
      posterImage,
      getCommentCount,
      getLikeCount,
      commentCount,
      likeToggle,
      formatDate,
      likeCount,
      isLiked,
    };
  },
});
</script>

<style scoped>
.unlike {
  /* background: red;
  padding: 2px;
  border-radius: 50%; */
}
ion-card:first-of-type {
  margin-top: 0 !important;
}
ion-card.main {
  margin: 0;
  box-shadow: none;
  border-bottom: 1px solid var(--ion-border-color);
  background: transparent;
  border-radius: 0;
  padding-top: 10px;
  width: 100%;
}
ion-icon {
  margin-right: 5px;
}
ion-card-header {
  display: flex;
  padding: 0 0 5px 0;
}
ion-card-title {
  font-size: 16px;
}
ion-card-content {
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
}
ion-card-content > p {
  font-size: 14px;
}

ion-card-subtitle {
  font-size: 10px;
}

ion-card-header > ion-avatar {
  margin-right: 10px;
}
.imageContainer {
  max-height: 200px;
  border-radius: 10px;
  width: 100%;
  object-fit: cover;
}
.imageContainer > img {
  height: inherit;
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  max-height: 200px;
}
ion-card.card-footer {
  display: flex;
  margin: 0;
  justify-content: space-between;
  background: transparent;
  box-shadow: none;
  padding-bottom: 10px;
  padding-right: 20px;
  border-bottom: 1px solid #2e2c2c;
  border-radius: 0;
}
ion-card.card-footer > div {
  display: flex;
}
</style>
