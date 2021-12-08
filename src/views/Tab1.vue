<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <img class="simg" alt="" src="@/assets/tolu.jpeg" />
        <ion-title>Fluxify</ion-title>

        <ion-icon slot="end" :icon="pencilOutline"></ion-icon>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <StatusScroll />
      <PostCard :face="true" />
      <PostCard v-for="item of posts" :key="item" :face="false" />

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
  IonTitle,
  IonToolbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonContent,
  IonIcon,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import StatusScroll from "@/components/StatusScroll.vue";
import PostCard from "@/components/PostCard.vue";
import { pencilOutline } from "ionicons/icons";

export default defineComponent({
  name: "Home",
  components: {
    IonHeader,
    StatusScroll,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    PostCard,
    IonTitle,
    IonToolbar,
    IonContent,
    IonIcon,
    IonPage,
  },
  setup() {
    const posts = ref([1, 2, 3, 4]);
    const loadData = (ev: any) => {
      setTimeout(() => {
        ev.target.complete();
        posts.value.push(2, 3, 5);
      }, 1000);
    };
    return {
      pencilOutline,
      loadData,
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
</style>
