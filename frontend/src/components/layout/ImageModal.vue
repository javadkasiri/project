<template>
  <div v-if="visible" class="image-modal-overlay" @click.self="close">
    <div class="image-modal-content">
      <span class="close-btn" @click="close">×</span>

      <div
        class="arrow left-arrow"
        v-if="images.length > 1 && currentIndex > 0"
        @click.stop="prevImage"
      >
        ‹
      </div>
      <div
        class="arrow right-arrow"
        v-if="images.length > 1 && currentIndex < images.length - 1"
        @click.stop="nextImage"
      >
        ›
      </div>

      <div class="image-gallery">
        <div class="image-container">
          <img
            v-if="currentImage"
            :src="getImageUrl(currentImage)"
            alt="Image"
            class="zoomable-image"
            :style="{
              transform:
                'scale(' +
                scale +
                ') translate(' +
                position.x +
                'px,' +
                position.y +
                'px)',
              cursor: scale > 1 ? 'grab' : 'default',
            }"
            @wheel.prevent="handleWheel"
            @mousedown.prevent="startDrag"
            @mousemove="onDrag"
            @mouseup="stopDrag"
            @mouseleave="stopDrag"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
      scale: 1,
      position: { x: 0, y: 0 },
      isDragging: false,
      dragStart: { x: 0, y: 0 },
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    },
  },
  watch: {
    images(newImages) {
      if (newImages.length > 0) {
        this.currentIndex = 0;
      }
    },
  },
  methods: {
    getImageUrl(name) {
      try {
        return require(`@/assets/label-images/${name}`);
      } catch (e) {
        console.error("Image URL not found", name);
        return "";
      }
    },
    close() {
      this.$emit("close");
      this.resetZoom();
    },
    nextImage() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
        this.resetZoom();
      }
    },
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.resetZoom();
      }
    },
    resetZoom() {
      this.scale = 1;
      this.position = { x: 0, y: 0 };
    },
    constrainPosition() {
      const container = this.$el.querySelector(".image-container");
      const img = this.$el.querySelector(".zoomable-image");

      if (!container || !img) return;

      const containerRect = container.getBoundingClientRect();

      const padding = 20;

      const containerWidth = containerRect.width - padding * 2;
      const containerHeight = containerRect.height - padding * 2;

      const imgWidth = img.offsetWidth * this.scale;
      const imgHeight = img.offsetHeight * this.scale;

      const excessX = Math.max(0, (imgWidth - containerWidth) / 2);
      const excessY = Math.max(0, (imgHeight - containerHeight) / 2);

      this.position.x = Math.max(-excessX, Math.min(this.position.x, excessX));
      this.position.y = Math.max(-excessY, Math.min(this.position.y, excessY));
    },
    handleWheel(event) {
      const zoomStep = 0.04;
      const maxZoom = 3;
      const minZoom = 1;

      if (event.deltaY < 0) {
        this.scale = Math.min(this.scale + zoomStep, maxZoom);
      } else {
        this.scale = Math.max(this.scale - zoomStep, minZoom);
        if (this.scale === minZoom) {
          this.position = { x: 0, y: 0 };
        }
      }

      this.constrainPosition(); // ← محدود کردن بعد از زوم
    },
    startDrag(event) {
      if (this.scale > 1) {
        this.isDragging = true;
        this.dragStart = {
          x: event.clientX - this.position.x,
          y: event.clientY - this.position.y,
        };
      }
    },
    onDrag(event) {
      if (this.isDragging) {
        this.position = {
          x: event.clientX - this.dragStart.x,
          y: event.clientY - this.dragStart.y,
        };
        this.constrainPosition(); // ← محدود کردن
      }
    },
    stopDrag() {
      this.isDragging = false;
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
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-modal-content {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  border-radius: 8px;
  width: 50vmin;
  height: 50vmin;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-gallery {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-gallery img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

.zoomable-image {
  transition: transform 0.2s ease;
  max-width: 100%;
  max-height: 100%;
  user-select: none;
}

.close-btn {
  position: absolute;
  top: 6px;
  right: 14px;
  font-size: 24px;
  cursor: pointer;
  color: #f5f5f5;
}

.close-btn:hover {
  color: #e74c3c;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 36px;
  font-weight: bold;
  color: #f5f5f5;
  cursor: pointer;
  user-select: none;
  z-index: 1000;
}

.left-arrow {
  left: 14px;
}

.right-arrow {
  right: 14px;
}
</style>
