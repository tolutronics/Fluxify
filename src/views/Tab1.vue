<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <img class="simg" alt="" src="@/assets/tolu.jpeg" />
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
      <PostCard :post="facePosts[0]" :face="true" v-if="faceLoading == false" />
      <ion-spinner name="circular" v-if="loading == true"></ion-spinner>
      <PostCard
        v-for="item of posts"
        :key="item"
        :post="item"
        :face="false"
        v-show="loading == false"
      />

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
import {
  IonPage,
  IonHeader,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonContent,
  modalController,
  IonIcon,
} from "@ionic/vue";
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

export default defineComponent({
  name: "Home",
  components: {
    IonHeader,
    StatusScroll,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    PostCard,
    IonTitle,
    IonSpinner,
    IonToolbar,
    IonContent,
    IonIcon,
    IonPage,
  },
  setup() {
    // const posts: any = ref([]);
    const store = useStore();
    const loading = ref(true);
    const noPost = ref(true);
    const facePosts = ref();
    const faceLoading = ref(true);

    const loadData = (ev: any) => {
      setTimeout(() => {
        ev.target.complete();
        // posts.value.push(2, 3, 5);
      }, 1000);
    };
    const posts = computed(() => store.getters.posts);
    // console.log(posts.value);

    const fetchPosts = async () => {
      const data = await getAllPosts();
      data.onSnapshot((query) => {
        const newPosts: any = [];
        query.forEach((doc) => {
          const post = doc.data();
          // newPosts.push(doc.data());
          delete post.posterphoto;
          delete post.name1;
          delete post.name2;
          post.userId = post.matric;
          delete post.matric;
          delete post.count;
          // console.log(post);
          // savePosts(post);
        });
        // posts.value = newPosts;
      });

      loading.value = false;
    };
    // console.log(loading.value);
    watch(posts, (currentValue, oldValue) => {
      loading.value = false;
      // console.log("done");
      if (currentValue.length < 1) {
        noPost.value = true;
      }
    });
    const fetchFacePosts = async () => {
      const data = await getFacePosts();
      data.onSnapshot((query) => {
        const dummyFacePost: any = [];
        query.forEach((doc) => {
          dummyFacePost.push(doc.data());
        });
        facePosts.value = dummyFacePost;
        // console.log("is here====>", facePosts.value);
        faceLoading.value = false;
      });
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
</style>
