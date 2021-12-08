<template>
  <div id="container">
    <ion-card class="main">
      <h3 v-if="face" class="ion-padding-start">
        Face of the week 🎊🎊🎊🎊🎊🎊
      </h3>
      <ion-card-header>
        <ion-avatar v-if="!face">
          <img src="@/assets/tolu.jpeg" />
        </ion-avatar>
        <div>
          <ion-card-subtitle class="ion-text-capitalize"
            >Nov 12 2021. 12:30pm</ion-card-subtitle
          >
          <ion-card-title
            >Tolulope Adeniyi <span v-if="face">🎉🎉</span></ion-card-title
          >
        </div>
      </ion-card-header>
      <ion-card-content :router-link="`/post/${1}`">
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
  props: {
    face: Boolean,
  },
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
