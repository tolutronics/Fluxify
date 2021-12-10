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
      <PostCard :post="post" />
      <!-- <CommentCard /> -->

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
        <InputBox />
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonContent,
} from "@ionic/vue";
import { computed, defineComponent, ref } from "vue";
// import CommentCard from "@/components/CommentCard.vue";
import PostCard from "@/components/PostCard.vue";
import InputBox from "@/components/InputBox.vue";
import { arrowBackOutline } from "ionicons/icons";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  components: {
    IonHeader,
    // CommentCard,
    PostCard,
    IonFooter,
    IonButtons,
    IonBackButton,
    IonInfiniteScroll,
    InputBox,
    IonInfiniteScrollContent,
    IonTitle,
    IonToolbar,
    IonContent,
    IonPage,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    //  const router = useRouter();
    //store.dispatch("news");
    const postId = route.params.uuid;
    console.log("post detail===>", postId);
    const post = computed(() => {
      return store.getters.post(postId);
    });

    const loadData = (ev: any) => {
      setTimeout(() => {
        ev.target.complete();
        // posts.value.push(2, 3, 5);
      }, 1000);
    };
    return {
      arrowBackOutline,
      loadData,
      post,
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
ion-toolbar > a > ion-icon {
  font-size: 25px;
  position: relative;
}
</style>
