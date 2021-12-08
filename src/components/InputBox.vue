<template>
  <div id="container">
    <ion-card>
      <ion-textarea
        type="text"
        autoGrow="true"
        autoCapitalize="true"
        spellCheck="true"
        placeholder="Reply this post"
      ></ion-textarea>

      <ion-icon class="send" :icon="send"></ion-icon>
    </ion-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonCard, IonIcon, IonTextarea, modalController } from "@ionic/vue";
import { send } from "ionicons/icons";
import ProfileView from "@/components/ProfileView.vue";
export default defineComponent({
  name: "InputBox",
  components: {
    IonCard,
    IonTextarea,
    IonIcon,
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
      send,
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
ion-textarea {
  max-height: 150px;
  --padding-end: 40px;
  font-size: 18px;
}
ion-icon.send {
  font-size: 18px;
  background: var(--ion-color-primary);
  color: #fff;
  padding: 10px;
  border-radius: 50%;
  position: absolute;
  bottom: 5px;
  right: 15px;
}
ion-card {
  margin: 0;
  padding: 0;
  box-shadow: none;
}
</style>
