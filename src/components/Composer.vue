<template>
  <div id="container">
    <ion-header>
      <ion-toolbar class="ion-padding-start ion-padding-end">
        <ion-label slot="start" @click="close">Close</ion-label>
        <ion-label slot="end">Post</ion-label>
      </ion-toolbar>
    </ion-header>
  </div>
</template>

<script lang="ts">
import {
  heartOutline,
  chatbubbleOutline,
  heart,
  shareSocial,
} from "ionicons/icons";
import { IonLabel, IonToolbar, IonHeader, modalController } from "@ionic/vue";
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "Posts",
  props: {
    face: Boolean,
  },
  components: {
    IonLabel,
    IonToolbar,
    IonHeader,
  },
  setup() {
    const isLiked = ref(false);

    const likeToggle = () => {
      isLiked.value = !isLiked.value;
    };
    const close = async () => {
      await modalController.dismiss();
    };
    return {
      heartOutline,
      chatbubbleOutline,
      heart,
      shareSocial,
      close,
      likeToggle,
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
}
ion-icon {
  margin-right: 5px;
}
ion-card-header {
  display: flex;
}
ion-card-title {
  font-size: 20px;
}
ion-card-content > p {
  padding: 0 0 5px 10px;
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
  justify-content: space-around;
  background: transparent;
  box-shadow: none;
  padding-bottom: 10px;
}
ion-card.card-footer > div {
  display: flex;
}
</style>
