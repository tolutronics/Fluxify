<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="chatbubbleOutline" />
          <ion-label>Chats</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="personOutline" />
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  home,
  peopleOutline,
  chatbubbleOutline,
  personOutline,
} from "ionicons/icons";
import commonIonicComponents from "@/shared/common-ionic-components";

export default defineComponent({
  name: "TabsPage",
  components: { ...commonIonicComponents },
  setup() {
    return {
      home,
      peopleOutline,
      chatbubbleOutline,
      personOutline,
    };
  },
});
</script>
<style scoped>
ion-tab-bar {
  height: 70px;
  border: none;
  border-radius: 25px 25px 0 0;
}
ion-tabs {
  background: var(--ion-background-color);
}
ion-icon {
  font-size: 22px;
}
.tab-selected > ion-icon {
  background-color: var(--ion-color-primary);
  padding: 10px;
  border-radius: 50%;
  color: #fff;
  transition: background 500ms ease-out;
}
.tab-selected > ion-label {
  font-size: 14px;
  font-weight: 700;
}
</style>
