<template>
  <ion-page>
    <ion-content color="primary">
      <div id="top-content"></div>
      <h1 class="ion-text-center">Connect with your school mates</h1>
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
  background-position: left;
  height: 40vh;
  opacity: 0.8;
}
h1 {
  font-family: "poppins";
  font-weight: 700;
  font-size: 2.3em;
}
</style>
