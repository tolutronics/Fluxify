<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Chats</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ChatList
        v-for="item of users"
        :key="item"
        :user="item"
        v-show="loaded"
      />
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
  IonFabButton,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import ChatList from "@/components/chatList.vue";
import { chatboxOutline } from "ionicons/icons";
import { ref, defineComponent } from "vue";
import { useStore } from "vuex";
import { getChatList } from "@/services/firebaseService";

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
    const store = useStore();
    const chatList: any = ref([]);
    const loaded = ref(false);

    const List = async () => {
      // const user = store.getters.currentUser();
      const data = await getChatList("1330GC018");
      data.onSnapshot((query) => {
        const list: any = [];
        query.forEach((doc) => {
          list.push(doc.data());
        });
        chatList.value = list;
        loaded.value = true;
      });
    };

    List();

    return {
      chatboxOutline,
      loaded,
      chatList,
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
