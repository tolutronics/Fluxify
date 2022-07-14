<template>
  <div id="container">
    <ion-row>
      <ion-col size="10" class="input">
        <ion-textarea
          type="text"
          :autoGrow="true"
          autoCapitalize="true"
          :rows="1"
          v-model="inputValue"
          spellCheck="true"
          placeholder="Reply this post"
        ></ion-textarea>
        <ion-icon :icon="image"></ion-icon>
      </ion-col>
      <ion-col size="2" class="iconCol">
        <ion-icon class="send" :icon="send" @click="getInput"></ion-icon>
      </ion-col>
    </ion-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { modalController } from "@ionic/vue";
import { send, image } from "ionicons/icons";
import ProfileView from "@/components/ProfileView.vue";
import commonIonicComponents from "@/shared/common-ionic-components";
export default defineComponent({
  name: "InputBox",
  emits: ["getInput"],
  components: {
    ...commonIonicComponents,
  },

  setup(props, context) {
    const inputValue = ref(null);
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
    const getInput = (ev: any) => {
      context.emit("getInput", inputValue.value);
      inputValue.value = null;
    };
    return {
      viewProfile,
      getInput,
      inputValue,
      send,
      image,
    };
  },
});
</script>

<style scoped>
h2 {
  font-weight: 700;
}
ion-row {
  margin: 10px 0;
}
ion-textarea {
  max-height: 150px;
  background: #323131;
  border-radius: 16px;
  padding-left: 10px;
  padding-right: 35px;
  /* height: 50px; */
}
.iconCol {
  display: flex;
  justify-content: center;
  align-items: center;
}
ion-icon.send {
  font-size: 18px;
  background: var(--ion-color-primary);
  color: #fff;
  padding: 10px;
  border-radius: 50%;
}
ion-card {
  margin: 0;
  padding: 0;
  box-shadow: none;
}
ion-col.input > ion-icon {
  position: absolute;
  top: 15px;
  z-index: 99;
  font-size: 25px;
  right: 20px;
  color: #4087f7;
}
</style>
