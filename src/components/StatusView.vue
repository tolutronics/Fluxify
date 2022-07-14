<template>
  <div id="container">
    <ion-icon class="close" :icon="closeCircle" @click="close"></ion-icon>
    <swiper
      :pagination="{
        type: 'progressbar',
      }"
      class="mySwiper"
      :slidesPerView="1"
      @swiper="onSwiperInstance"
    >
      <swiper-slide>
        <img class="simg" alt="" src="@/assets/tolu.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="simg" alt="" src="@/assets/tolu.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="simg" alt="" src="@/assets/tolu.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="simg" alt="" src="@/assets/tolu.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="simg" alt="" src="@/assets/tolu.jpeg" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { modalController, IonIcon } from "@ionic/vue";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { defineComponent } from "vue";
import { closeCircle } from "ionicons/icons";
import SwiperCore, { Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination]);
export default defineComponent({
  name: "StatusView",
  components: {
    SwiperSlide,
    Swiper,
    IonIcon,
  },
  setup() {
    let swiperRef: any = null;

    const onSwiperInstance = (instance: any) => {
      swiperRef = instance;
    };

    const close = async () => {
      await modalController.dismiss();
    };

    setTimeout(() => {
      swiperRef.update();
    }, 500);

    return {
      closeCircle,
      close,
      onSwiperInstance,
    };
  },
});
</script>

<style scoped>
ion-icon.close {
  font-size: 30px;
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 10;
}
</style>
