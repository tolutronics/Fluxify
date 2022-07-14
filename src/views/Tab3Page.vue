<template>
  <ion-page>
    <ion-content>
      <ion-card class="img">
        <img src="@/assets/tolu.jpeg" alt="" />
      </ion-card>

      <ion-grid fixed>
        <ion-row>
          <ion-col class="col-border" size="6">
            <p>First Name</p>
            <h3>Tolulope</h3>
          </ion-col>
          <ion-col size="6">
            <p>Last Name</p>
            <h3>Adeniyi</h3>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="col-border" size="6">
            <p>Nickname</p>
            <h3>Tolutronics</h3>
          </ion-col>
          <ion-col size="6">
            <p>Matric Number</p>
            <h3>13/30GC016</h3>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="col-border" size="6">
            <p>Email</p>
            <h3>toluxy100@gmail.com</h3>
          </ion-col>
          <ion-col size="6">
            <p>Phone Number</p>
            <h3>07031234126</h3>
          </ion-col>
        </ion-row>

        <ion-row class="socials">
          <ion-col size="4" class="ion-text-center">
            <ion-icon :icon="logoLinkedin"></ion-icon>
          </ion-col>
          <ion-col size="4" class="ion-text-center">
            <ion-icon :icon="logoInstagram"></ion-icon>
          </ion-col>
          <ion-col size="4" class="ion-text-center">
            <ion-icon :icon="logoTwitter"></ion-icon>
          </ion-col>
        </ion-row>

        <div class="hobbies-wrapper">
          <ion-card class="hobbies" v-for="item of [1, 2, 3, 4]" :key="item"
            >Reading
          </ion-card>
        </div>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { logoLinkedin, logoInstagram, logoTwitter } from "ionicons/icons";
import commonIonicComponents from "@/shared/common-ionic-components";

export default {
  name: "Profile",
  components: {
    ...commonIonicComponents,
  },
  setup() {
    return {
      logoLinkedin,
      logoInstagram,
      logoTwitter,
    };
  },
};
</script>

<style scoped>
ion-row {
  padding: 10px;
  border-bottom: 1px solid var(--ion-border-color);
}
ion-row.socials > ion-col > ion-icon {
  font-size: 20px;
}
ion-col {
  padding: 10px;
}
ion-col:not(.col-border) {
  padding-left: 25px;
}
.col-border {
  border-right: 1px solid var(--ion-border-color);
}
ion-card.img {
  height: 50vh;
  padding: 0;
  margin: 0;
  border-radius: 0;
  box-shadow: none;
}

ion-card > img {
  object-fit: cover;
}
h3 {
  margin: 0;
  font-size: 20px;
}
p {
  margin: 0;
}

.hobbies-wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 5px;
}
.hobbies-wrapper > ion-card {
  width: fit-content;
  border-radius: 25px;
  padding: 16px;
  margin: 5px;
  background: #6946e8;
  color: #fff;
}
</style>
