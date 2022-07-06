<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="ion-padding-start">
        <ion-buttons slot="start">
          <ion-back-button
            :icon="arrowBackOutline"
            :text="''"
            :default-href="'/tabs/tab2'"
          ></ion-back-button>
        </ion-buttons>
        <ion-title>My Mates</ion-title>
      </ion-toolbar>
      <ion-searchbar
        placeholder="Name / matric number"
        @ionChange="onSearchChange($event)"
      ></ion-searchbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="user of users" :key="user">
          <ion-avatar @click="viewProfile">
            <img v-if="user.photourl" :src="user.photourl" />
            <img v-if="!user.photourl" src="@/assets/male.png" />
          </ion-avatar>
          <ion-label :router-link="`/chat/${user.matric}`">
            <h2>{{ user.firstname }} {{ user.lastname }}</h2>
            <p>{{ user.matric }}</p>
            <!-- <p>Hello, how are you</p> -->
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { arrowBackOutline } from "ionicons/icons";
import { modalController, onIonViewWillEnter } from "@ionic/vue";
import ProfileView from "@/components/ProfileView.vue";
import { useStore } from "vuex";
import { User } from "@/types/users";
import CommonIonicComponents from "@/shared/common-ionic-components";
export default defineComponent({
  name: "Mates",
  components: {
    ...CommonIonicComponents,
  },

  setup() {
    const store = useStore();
    const users = ref<User[]>([]);
    const usersCopy = ref<User[]>([]);
    users.value = store.getters.users;
    usersCopy.value = store.getters.users;
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

    const initializeItems = () => {
      users.value = usersCopy.value;
    };

    const onSearchChange = (evt: any) => {
      initializeItems();

      const searchTerm = evt.srcElement.value;

      if (!searchTerm) {
        return;
      }

      users.value = usersCopy.value.filter((user) => {
        if (user && searchTerm) {
          if (
            user.firstname.toLowerCase().indexOf(searchTerm.toLowerCase()) >
              -1 ||
            user.lastname.toLowerCase().indexOf(searchTerm.toLowerCase()) >
              -1 ||
            user.matric.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
          ) {
            return true;
          }
          return false;
        }
      });
    };

    return {
      viewProfile,
      onSearchChange,
      users,
      arrowBackOutline,
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
