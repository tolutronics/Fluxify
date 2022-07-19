<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <img
          v-if="!currentUser"
          class="simg"
          slot="start"
          alt=""
          src="@/assets/male.png"
        />
        <img
          v-if="currentUser.photoUrl"
          class="simg"
          slot="start"
          alt=""
          :src="currentUser.photoUrl"
        />
        <ion-title>Fluxify</ion-title>

        <ion-icon
          slot="end"
          :icon="pencilOutline"
          @click="composePost"
        ></ion-icon>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <StatusScroll />
      <!-- <ion-item class="notice" lines="none">
        <ion-avatar>
          <img src="@/assets/male.png" />
        </ion-avatar>
        <ion-label>
          <h3>Profile update needed</h3>
          <p>Complete your profile so that you can be found easily</p>
        </ion-label>
        <ion-chip color="danger" mode="ios" outline="true">
          <ion-label>Update</ion-label>
        </ion-chip>
      </ion-item> -->
      <!-- <PostCard :post="facePosts" :face="true" v-if="faceLoading == false" /> -->
      <ion-spinner name="circular" v-if="loading == true"></ion-spinner>
      <PostCard v-for="item of posts" :key="item" :post="item" :face="false" />

      <ion-infinite-scroll threshold="25%" @ionInfinite="loadData($event)">
        <ion-infinite-scroll-content
          loadingSpinner="bubbles"
          loadingText="Loading more data..."
        >
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { modalController, onIonViewWillEnter } from "@ionic/vue";
import { computed, defineComponent, ref, watch } from "vue";
import StatusScroll from "@/components/StatusScroll.vue";
import PostCard from "@/components/PostCard.vue";
import Composer from "@/components/Composer.vue";
import { pencilOutline } from "ionicons/icons";
import { useStore } from "vuex";
import commonIonicComponents from "@/shared/common-ionic-components";
import { User } from "@/types/users";
import {
  getAllPosts,
  getSession,
  savePostToDatabase,
} from "@/services/supabase/supabaseClient";
import { createToast } from "mosha-vue-toastify";

export default defineComponent({
  name: "Home",
  components: {
    ...commonIonicComponents,
    StatusScroll,
    PostCard,
  },
  setup() {
    // const posts: any = ref([]);
    const store = useStore();
    const loading = ref(true);
    const noPost = ref(true);
    const facePosts = ref();
    const faceLoading = ref(true);
    const currentUser = computed(() => store.getters.currentUser);

    const loadData = (ev: any) => {
      setTimeout(() => {
        ev.target.complete();
        // posts.value.push(2, 3, 5);
      }, 1000);
    };
    const posts = computed(() => store.getters.posts);

    // console.log(loading.value);
    watch(posts, (currentValue, oldValue) => {
      loading.value = false;
      console.log("done");
      if (currentValue.length < 1) {
        noPost.value = true;
      }
    });

    const getPosts = async () => {
      const result = await getAllPosts();
      if (!result.error) {
        store.commit("setPosts", result.data);
      } else {
        //
      }
      console.log(result);
    };

    getPosts();

    const composePost = async () => {
      const modal = await modalController.create({
        component: Composer,
        cssClass: "my-custom-class",
        componentProps: {
          title: "New Title",
        },
      });
      modal.present();

      const { data } = await modal.onDidDismiss();
      console.log(data);
      if (data) {
        store.commit("addPosts", data);
        const result = await savePostToDatabase(data[0]);
        if (!result.error) {
          createToast("Post successful");
          getPosts();
        }
      } else {
      }
    };

    return {
      pencilOutline,
      loadData,
      loading,
      faceLoading,
      facePosts,
      noPost,

      currentUser,
      composePost,
      posts,
    };
  },
});
</script>

<style scoped>
ion-toolbar {
  --padding-start: 10px;
  --padding-end: 10px;
  --padding-bottom: 10px;
  --padding-top: 10px;
  --ion-background: red;
}
img.simg {
  float: left;
  width: 35px;
  height: 35px;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 100%;
}
ion-toolbar > ion-icon {
  font-size: 21px;
  background: var(--ion-color-primary);
  position: relative;
  border-radius: 10px;
  color: #fff;
  padding: 6px;
}
ion-spinner {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 60px;
}
ion-item.notice {
  --padding-top: 8px;
  --padding-bottom: 8px;
  margin: 0;
  box-shadow: none;
  --background: #f5c9d4;
  color: #000;
  --border-radius: 16px;
}
ion-item.notice > ion-label {
  white-space: pre-line;
  margin-left: 10px;
}
ion-item.notice > ion-label > p {
  font-size: 14px;
  color: #000;
}
ion-item.notice > ion-label > h3 {
  font-size: 16px;
  color: #000;
  font-weight: 600;
}
</style>
