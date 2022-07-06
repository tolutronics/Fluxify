<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="ion-padding-start">
        <ion-buttons slot="start">
          <ion-back-button
            :icon="arrowBackOutline"
            :text="''"
            :default-href="'/mates'"
          ></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content> </ion-content>
  </ion-page>
</template>

<script lang="ts">
import commonIonicComponents from "@/shared/common-ionic-components";
import { arrowBackOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "ChatPage",
  components: {
    ...commonIonicComponents,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const postId = route.params.uuid;

    return {
      arrowBackOutline,
    };
  },
});
</script>

<style></style>
