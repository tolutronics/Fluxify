<template>
  <div id="container">
    <swiper
      :navigation="false"
      class="mySwiper"
      v-if="loaded"
      :slidesPerView="5"
      :spaceBetween="10"
    >
      <swiper-slide class="statusCircle default" @click="viewProfile">
        <img class="simg" alt="" src="@/assets/tolu.jpeg" />
        <ion-icon :icon="addCircle"></ion-icon>
      </swiper-slide>
      <swiper-slide
        class="statusCircle"
        v-for="item of [1, 2, 3, 4, 5]"
        :key="item"
        @click="viewProfile"
      >
        <img class="simg" alt="" src="@/assets/tolu.jpeg" />
        <span class="circleName">Tolulope</span>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { modalController, IonIcon } from "@ionic/vue";
import { addCircle } from "ionicons/icons";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { ref, defineComponent } from "vue";
import StatusView from "@/components/StatusView.vue";
export default defineComponent({
  name: "Status",
  components: {
    SwiperSlide,
    Swiper,
    IonIcon,
  },
  setup() {
    const loaded = ref(false);

    const viewProfile = async () => {
      const modal = await modalController.create({
        component: StatusView,
        cssClass: "my-custom-class",
        componentProps: {
          title: "New Title",
        },
      });
      await modal.present();
    };

    setTimeout(() => {
      loaded.value = true;
    }, 2000);
    return {
      loaded,
      viewProfile,
      addCircle,
    };
  },
});
</script>

<style scoped>
.mySwiper {
  height: fit-content;
  /* background: red; */
  /* width: fit-content; */
  padding-bottom: 25px;
  border-bottom: 1px solid var(--ion-border-color);
}
.statusCircle {
  width: 60px !important;
  height: 60px !important;
  border-radius: 50%;
  border: 1px solid #4f22f3;
  padding: 2px;
}
.default {
  position: relative;
}
.default > ion-icon {
  position: absolute;
  bottom: -4px;
  right: 2px;
  font-size: 22px;
  color: var(--ion-color-primary);
  background: #e6e1e1;
  border-radius: 50%;
}
.statusCircle > img {
  border-radius: 50%;
  object-fit: cover;
}
.circleName {
  font-size: 12px;
  position: absolute;
  bottom: -15px;
  right: 10px;
}
</style>
