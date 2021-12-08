<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Chats</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ChatList v-for="item of [1, 2, 3, 4, 5]" :key="item" v-show="loaded" />
      <ion-spinner name="lines" v-show="!loaded"></ion-spinner>
      <ion-fab
        vertical="bottom"
        horizontal="end"
        slot="fixed"
        :router-link="'/mates'"
      >
        <ion-fab-button>
          <ion-icon :icon="chatboxOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonSpinner,
  IonIcon,
  IonFab,
  modalController,
  IonFabButton,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import ChatList from "@/components/chatList.vue";
import { chatboxOutline } from "ionicons/icons";
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "Chat",
  components: {
    IonHeader,
    IonToolbar,
    ChatList,
    IonSpinner,
    IonIcon,
    IonFab,
    IonFabButton,
    IonTitle,
    IonContent,
    IonPage,
  },

  setup() {
    const loaded = ref(false);

    setTimeout(() => {
      loaded.value = true;
    }, 2000);
    return {
      chatboxOutline,
      loaded,
    };
  },
});
</script>
<style scoped>
ion-spinner {
  position: absolute;
  inset: 0;
  margin: auto;
}
ion-fab {
  right: 25px;
  bottom: 25px;
}
</style>
