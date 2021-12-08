<template>
  <div id="container">
    <ion-list>
      <ion-item>
        <ion-avatar>
          <img src="@/assets/tolu.jpeg" />
        </ion-avatar>
        <ion-label @click="viewProfile">
          <p>13/30GC018</p>
          <h2>Tolulope Adeniyi</h2>
          <p>Hello, how are you</p>
        </ion-label>
      </ion-item>
    </ion-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  modalController,
} from "@ionic/vue";
import ProfileView from "@/components/ProfileView.vue";
export default defineComponent({
  name: "Chat",
  components: {
    IonList,
    IonItem,

    IonAvatar,
    IonLabel,
  },

  setup() {
    const viewProfile = async () => {
      const modal = await modalController.create({
        component: ProfileView,
        cssClass: "my-custom-class",
        componentProps: {
          title: "New Title",
        },
      });
      await modal.present();
    };
    return {
      viewProfile,
    };
  },
});
</script>

<style scoped>
ion-avatar {
  margin-right: 10px;
  height: 50px;
  width: 50px;
}
h2 {
  font-weight: 700;
}
ion-item {
  --padding-top: 10px;
  --padding-bottom: 10px;
}
</style>
