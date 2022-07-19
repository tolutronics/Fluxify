<template>
  <div id="container">
    <ion-grid fixed>
      <ion-row>
        <ion-col size="2">
          <ion-avatar>
            <img v-if="posterImage" :src="posterImage" />
            <img v-else src="@/assets/male.png" />
          </ion-avatar>
        </ion-col>

        <ion-col size="10">
          <ion-card class="main" mode="ios">
            <ion-card-header>
              <div>
                <ion-card-subtitle class="ion-text-capitalize">{{
                  formatDate(comment.createdAt)
                }}</ion-card-subtitle>

                <ion-card-title>{{ posterName }} </ion-card-title>
              </div>
            </ion-card-header>
            <ion-card-content
              @click="setPost(comment)"
              :router-link="`/post/${comment.commentId}`"
            >
              <p>
                {{ comment.postText }}
              </p>

              <div class="imageContainer" v-if="comment.photoUrl">
                <img :src="comment.photoUrl" />
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
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script lang="ts">
import {
  heartOutline,
  chatbubbleOutline,
  heart,
  shareSocial,
} from "ionicons/icons";

import { ref, defineComponent, computed, PropType, reactive } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import commonIonicComponents from "@/shared/common-ionic-components";
import { getPost, setPost } from "@/shared/data.service";
import { Comment } from "@/types/comments";
import {
  addLike,
  getCommentsCount,
  getLikesCount,
  removeLike,
} from "@/services/supabase/supabaseClient";
import { onIonViewDidEnter } from "@ionic/vue";
import { Like } from "@/types/like";
export default defineComponent({
  name: "comment",
  props: {
    comment: {
      type: Object as PropType<Comment>,
      default: {} as Comment,
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
    const currentUser = computed(() => store.getters.currentUser);
    const likeToggle = async () => {
      isLiked.value = !isLiked.value;
      if (!isLiked) {
        await removeLike("");
      } else {
        const likeData: Like = {
          studentId: currentUser.value.studentId,
          studentNumber: currentUser.value.studentNumber,
          postId: props.comment.commentId,
        };
        await addLike(likeData);
      }
    };
    const formatDate = (date: any) => {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    };
    const posterName = computed(() => {
      return store.getters.posterName(props.comment);
    });

    const posterImage = computed(() => {
      const image = store.getters.posterImage(props.comment);

      return image;
    });
    const getCommentCount = async () => {
      commentCount.value = await getCommentsCount(props.comment.commentId);
    };

    const getLikeCount = async () => {
      likeCount.value = await getLikesCount(props.comment.commentId);
    };

    onIonViewDidEnter(() => {
      console.log("came here");
      getCommentCount();
      getLikeCount();
    });

    return {
      heartOutline,
      chatbubbleOutline,
      heart,
      shareSocial,
      posterName,
      posterImage,
      commentCount,
      setPost,
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
ion-col > ion-avatar {
  height: 50px;
  width: 50px;
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
}
ion-card.card-footer > div {
  display: flex;
}
</style>
