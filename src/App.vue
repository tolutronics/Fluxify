<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
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
