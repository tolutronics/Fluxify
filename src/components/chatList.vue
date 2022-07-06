<template>
  <div id="container">
    <ion-list>
      <ion-item>
        <ion-avatar @click="viewProfile">
          <img src="@/assets/tolu.jpeg" />
        </ion-avatar>
        <ion-label>
          <p>{{ user.matric }}</p>
          <h2>{{ user.firstname + " " + user.lastname }}</h2>
          <p>Hello, how are you</p>
        </ion-label>
      </ion-item>
    </ion-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import {
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  modalController,
} from "@ionic/vue";
import ProfileView from "@/components/ProfileView.vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "Chat",
  props: {
    user: {},
  },
  components: {
    IonList,
    IonItem,

    IonAvatar,
    IonLabel,
  },

  setup(props) {
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
