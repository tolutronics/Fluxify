<template>
  <ion-page>
    <ion-content color="primary" class="ion-padding">
      <div id="top-content"></div>
      <h1 class="ion-text-center">Connect with your school mates</h1>
      <ion-input type="text" placeholder="Awesome Input"></ion-input>
      <ion-button :expand="'block'" :color="'secondary'"> Login </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import commonIonicComponents from "@/shared/common-ionic-components";
import { useStore } from "vuex";

export default defineComponent({
  name: "Login",
  components: {
    ...commonIonicComponents,
  },

  setup() {
    const store = useStore();

    return {};
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
ion-button {
}
h1 {
  font-family: "poppins";
  font-weight: 700;
  font-size: 2.3em;
}
</style>
