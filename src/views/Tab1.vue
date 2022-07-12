<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <img
          v-if="!currentUser.photourl"
          class="simg"
          slot="start"
          alt=""
          src="@/assets/male.png"
        />
        <img
          v-if="currentUser.photourl"
          class="simg"
          slot="start"
          alt=""
          :src="currentUser.photourl"
        />
        <ion-title>Fluxify</ion-title>

        <ion-icon
          slot="end"
          :icon="pencilOutline"
          @click="composePost"
        ></ion-icon>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <StatusScroll />
      <ion-item class="notice" lines="none">
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
      </ion-item>
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
import { modalController } from "@ionic/vue";
import { computed, defineComponent, ref, watch } from "vue";
import StatusScroll from "@/components/StatusScroll.vue";
import PostCard from "@/components/PostCard.vue";
import Composer from "@/components/Composer.vue";
import { pencilOutline } from "ionicons/icons";
import {
  getAllPosts,
  getFacePosts,
  savePosts,
} from "@/services/firebaseService";
import { useStore } from "vuex";
import commonIonicComponents from "@/shared/common-ionic-components";
import { User } from "@/types/users";
import { onSnapshot } from "firebase/firestore";

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
    const currentUser: User = store.getters.currentUser;
    console.log({ currentUser });
    const loadData = (ev: any) => {
      setTimeout(() => {
        ev.target.complete();
        // posts.value.push(2, 3, 5);
      }, 1000);
    };
    const posts = computed(() => store.getters.posts);
    loading.value = false;
    console.log("===>", posts.value);

    const fetchPosts = async () => {
      const data = await getAllPosts();
      console.log("pstssssss", data);
      const posts: any = [];
      onSnapshot(data, async (snapshot: any) => {
        snapshot.docChanges().forEach(async (change: any) => {
          if (change.type === "added") {
            // console.log("New city: ", change.doc.data());
            posts.push(change.doc.data());
          }
          if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
          }
        });
        console.log(posts);
      });
      // data.onSnapshot((query) => {
      //   const newPosts: any = [];
      //   query.forEach((doc) => {
      //     const post = doc.data();
      //     // newPosts.push(doc.data());
      //     delete post.posterphoto;
      //     delete post.name1;
      //     delete post.name2;
      //     post.userId = post.matric;
      //     delete post.matric;
      //     delete post.count;
      //     // console.log(post);
      //     // savePosts(post);
      //   });
      //   // posts.value = newPosts;
      // });

      loading.value = false;
    };
    // console.log(loading.value);
    watch(posts, (currentValue, oldValue) => {
      loading.value = false;
      console.log("done");
      if (currentValue.length < 1) {
        noPost.value = true;
      }
    });
    const fetchFacePosts = async () => {
      const data = await getFacePosts();
      // data.onSnapshot((query) => {
      //   const dummyFacePost: any = [];
      //   query.forEach((doc) => {
      //     dummyFacePost.push(doc.data());
      //   });
      //   facePosts.value = dummyFacePost[0];
      //   // console.log("is here====>", facePosts.value);
      //   faceLoading.value = false;
      //   store.commit("setFacePost", facePosts.value);
      //   console.log(facePosts.value);
      //   console.log("faccee", store.getters.facePost);
      // });
    };

    // fetchUser();
    // fetchPosts();
    fetchFacePosts();

    const composePost = async () => {
      const modal = await modalController.create({
        component: Composer,
        cssClass: "my-custom-class",
        componentProps: {
          title: "New Title",
        },
      });
      await modal.present();
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
