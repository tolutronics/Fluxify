<template>
  <div id="container">
    <ion-header>
      <ion-toolbar class="ion-padding-start ion-padding-end">
        <ion-label slot="start" @click="closeModal">Close</ion-label>
        <ion-label slot="end" @click="makePost">Post</ion-label>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid fixed>
        <ion-row>
          <ion-col size="2">
            <ion-row>
              <ion-col size="12">
                <ion-icon :icon="image" class="options"></ion-icon>
              </ion-col>
              <ion-col size="12">
                <ion-icon :icon="camera" class="options"></ion-icon>
              </ion-col>
              <ion-col size="12">
                <ion-icon :icon="location" class="options"></ion-icon>
              </ion-col>
              <ion-col size="12">
                <ion-icon :icon="videocam" class="options"></ion-icon>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="10">
            <ion-textarea
              :auto-grow="true"
              :autofocus="true"
              v-model="postText"
              placeholder="What's on your mind"
            ></ion-textarea>
            <ion-row>
              <ion-col
                class="img-col"
                :size="img > 1 ? 6 : 12"
                v-for="item in img"
                :key="item"
              >
                <ion-icon :icon="close" class="close"></ion-icon>
                <img
                  class="postImage"
                  :class="img > 1 ? 'multiple' : 'single'"
                  src="@/assets/tolu.jpeg"
                  alt=""
                  srcset=""
                />
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </div>
</template>

<script lang="ts">
import { image, location, close, videocam, camera } from "ionicons/icons";
import { modalController } from "@ionic/vue";
import { ref, defineComponent } from "vue";
import commonIonicComponents from "@/shared/common-ionic-components";
import { Post } from "@/types/posts";
import { useStore } from "vuex";
export default defineComponent({
  name: "Posts",
  components: {
    ...commonIonicComponents,
  },
  setup() {
    const img = 4;
    const postText = ref("");
    const store = useStore();
    const currentUser = store.getters.currentUser;
    const closeModal = async () => {
      await modalController.dismiss();
    };

    const makePost = async () => {
      console.log(postText.value);
      if (postText.value != "") {
        const postData = [
          {
            postText: postText.value,
            createdAt: new Date(),
            studentId: currentUser.studentId,
            studentNumber: currentUser.studentNumber,
          },
        ];
        await modalController.dismiss(postData);
      } else {
      }
    };
    return {
      closeModal,
      image,
      camera,
      makePost,
      location,
      postText,
      img,
      close,
      videocam,
    };
  },
});
</script>

<style scoped>
ion-content {
  height: 100vh;
}
ion-icon.options {
  font-size: 25px;
  border-radius: 50%;
  background: rgb(89, 104, 241);
  padding: 5px;
  color: #fff;
}
ion-icon.close {
  position: absolute;
  font-size: 25px;
  right: 10px;
  top: 10px;
  color: #fff;
}
.img-col {
  padding: 1px;
}
.single {
  height: 200px;
}
.multiple {
  height: 150px;
}
img.postImage {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
}
</style>
