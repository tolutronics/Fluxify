<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Chats</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ChatList
        v-for="item of chatList"
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
import ChatList from "@/components/chatList.vue";
import { chatboxOutline } from "ionicons/icons";
import { ref, defineComponent, computed } from "vue";
import { useStore } from "vuex";
import commonIonicComponents from "@/shared/common-ionic-components";

export default defineComponent({
  name: "Chat",
  components: {
    ...commonIonicComponents,
    ChatList,
  },

  setup() {
    const store = useStore();
    const chatList: any = ref([]);
    const loaded = ref(false);
    const currentUser = computed(() => store.getters.currentUser);

    return {
      chatboxOutline,
      loaded,
      currentUser,
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
