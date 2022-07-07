<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const store = useStore();
    store.dispatch("users");
  },
});
</script>
<style>
.ios {
  font-family: "poppins";
}
.md {
  font-family: "poppins";
}
h1,
h2,
h3,
p {
  font-family: "poppins";
}
p {
  color: #363535;
}

.mosha__toast {
  border-radius: 0 !important;
  top: 0 !important;
  max-width: 100% !important;
  width: 100vw !important;
}
</style>
