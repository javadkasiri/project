<template>
  <div v-if="visible" class="image-modal-overlay" @click.self="close">
    <div class="image-modal-content">
      <span class="close-button" @click="close">×</span>
      <div class="image-gallery">
        <img
          v-for="(img, index) in images"
          :key="index"
          :src="getImageUrl(img)"
          alt="Image"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
   methods: {
    getImageUrl(name) {
      // مسیر صحیح برای resolve کردن عکس‌ها از داخل کامپوننت
      try {
        return new URL(`../../../assets/problem-images/${name}`, import.meta.url).href;
      } catch (e) {
        console.error(" آدرس عکس پیدا نشد:", name);
        return "";
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.image-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-height: 90vh;
  overflow-y: auto;
  max-width: 90vw;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-gallery img {
  max-width: 200px;
  max-height: 200px;
  border-radius: 6px;
}

.close-button {
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>

