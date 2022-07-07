<template>
  <ion-page>
    <ion-content color="primary" class="ion-padding">
      <div id="top-content"></div>
      <h1 class="ion-text-center">Connect with your school mates</h1>
      <ion-item :fill="'outline'" :mode="'md'">
        <ion-label position="floating">Matric Number</ion-label>
        <ion-input type="text" autocomplete="off" autocorrect="off"></ion-input>
      </ion-item>
      <ion-item :fill="'outline'" :mode="'md'">
        <ion-label position="floating">Password</ion-label>
        <ion-input
          type="password"
          autocomplete="off"
          autocorrect="off"
        ></ion-input>
      </ion-item>
      <ion-button
        :disabled="loading"
        :expand="'block'"
        :color="'secondary'"
        @click="login"
      >
        <span v-if="!loading">Login</span>
        <ion-spinner v-if="loading" name="lines"></ion-spinner>
      </ion-button>
    </ion-content>
    <ion-footer class="ion-no-border">
      <ion-toolbar color="primary" class="ion-text-center">
        Ele18 2022
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import commonIonicComponents from "@/shared/common-ionic-components";
import { useStore } from "vuex";
import { createToast } from "mosha-vue-toastify";

export default defineComponent({
  name: "Login",
  components: {
    ...commonIonicComponents,
  },

  setup() {
    const store = useStore();
    const loading = ref(false);
    const login = () => {
      loading.value = true;
      createToast("Wow, easy");
    };
    return { loading, login };
  },
});
</script>
<style scoped>
#top-content {
  background-image: url("../assets/network.png");
  background-repeat: no-repeat;
  background-position: center;
  height: 30vh;
  opacity: 0.8;
}
ion-input {
  font-weight: 600;
}
ion-button {
  margin-top: 20px;
  height: 55px;
  margin-left: 0;
  margin-right: 0;
}
.item-has-focus ion-label {
  color: #fff !important;
}
.item-has-focus {
  --border-color: #fff !important;
  --background: transparent;
  --highlight-background: #fff;
}

h1 {
  font-family: "poppins";
  font-weight: 700;
  font-size: 2em;
  margin-bottom: 20px;
}
ion-item {
  --ion-item-background: var(--ion-color-primary);
  margin-bottom: 20px;
  --border-color: #fff !important;
}
ion-item::part(native) {
  border-radius: 10px;
}
</style>
