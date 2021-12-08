<template>
  <div id="container">
    <ion-avatar>
      <img src="@/assets/tolu.jpeg" />
    </ion-avatar>
    <ion-card class="main">
      <ion-card-header>
        <div>
          <ion-card-subtitle class="ion-text-capitalize"
            >November 12 2021 12:30pm</ion-card-subtitle
          >
          <ion-card-title>Awesome Title</ion-card-title>
        </div>
      </ion-card-header>
      <ion-card-content>
        <p>
          Lorem ipsum dolor adipisicing elit. Nihil, debitis sit amet
          consectetur adipisicing elit. Nihil, debitis.
        </p>

        <div class="imageContainer">
          <img src="@/assets/tolu.jpeg" />
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
          <span slot="start" class="likeCount">{{ 1098 }}</span>
        </div>

        <div>
          <ion-icon
            size="small"
            class="darktheme"
            :icon="shareSocial"
          ></ion-icon>
          <span class="likeCount">{{ 300 }}</span>
        </div>

        <div>
          <ion-icon
            size="small"
            class="darktheme"
            :icon="chatbubbleOutline"
            slot="end"
          ></ion-icon>
          <span slot="end" class="likeCount">{{ 500 }}</span>
        </div>
      </ion-card>
    </ion-card>
  </div>
</template>

<script lang="ts">
import {
  heartOutline,
  chatbubbleOutline,
  heart,
  shareSocial,
} from "ionicons/icons";
import {
  IonCard,
  IonAvatar,
  IonCardSubtitle,
  IonCardContent,
  IonCardHeader,
  IonIcon,
  IonCardTitle,
} from "@ionic/vue";
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "Posts",
  components: {
    IonCard,
    IonCardSubtitle,
    IonAvatar,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
  },
  setup() {
    const isLiked = ref(false);

    const likeToggle = () => {
      isLiked.value = !isLiked.value;
    };
    return {
      heartOutline,
      chatbubbleOutline,
      heart,
      shareSocial,
      likeToggle,
      isLiked,
    };
  },
});
</script>

<style scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
}
.unlike {
  /* background: red;
  padding: 2px;
  border-radius: 50%; */
}

ion-card.main {
  width: 80%;
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
  padding-top: 0;
}
ion-card-title {
  font-size: 20px;
}
ion-card-content > p {
  padding: 0 0 5px;
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
  object-fit: cover;
  border-radius: 10px;
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
