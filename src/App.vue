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
  font-family: "alegreya";
}
.md {
  font-family: "alegreya";
}
h1,
h2,
h3,
p {
  font-family: "alegreya";
}
p {
  color: #363535;
}
</style>
