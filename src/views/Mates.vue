<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="ion-padding-start">
        <ion-buttons slot="start">
          <ion-back-button
            :icon="arrowBackOutline"
            :text="''"
            :default-href="'/tabs/tab2'"
          ></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="item of [1, 2, 3, 4, 5]" :key="item">
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
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { arrowBackOutline } from "ionicons/icons";
import {
  IonList,
  IonItem,
  IonAvatar,
  IonPage,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonContent,
  IonLabel,
  modalController,
} from "@ionic/vue";
import ProfileView from "@/components/ProfileView.vue";
export default defineComponent({
  name: "Mates",
  components: {
    IonList,
    IonItem,
    IonContent,
    IonBackButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonPage,
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
      arrowBackOutline,
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
