<template>
  <div class="file-modal-overlay" @click.self="close">
    <div class="file-modal-content">
      <span class="close-btn" @click="close">×</span>

      <!-- Header row -->
      <div class="file-header">
        <span class="header-cell-name">File Name</span>
        <span class="header-cell-type">Type</span>
        <span class="header-cell-size">Size</span>
        <span class="header-cell-download">DL</span>
      </div>

      <!-- File list -->
      <div class="file-list">
        <div v-for="(file, index) in files" :key="index" class="file-item">
          <span class="file-name">{{ getFileName(file) }}</span>
          <span class="file-type">{{ getFileType(file) }}</span>
          <span class="file-size">{{ getFileSize(file) }}</span>
          <a
            :href="getFileUrl(file)"
            download
            class="material-symbols-outlined download-icon"
            >arrow_circle_down</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    files: Array,
  },
  methods: {
    close() {
      this.$emit("close");
    },
    getFileUrl(file) {
      return `/label-files/${file}`; // از public فراخوانی میشه
    },
    getFileName(file) {
      return file;
    },
    getFileType(file) {
      const parts = file.split(".");
      return parts.length > 1 ? parts.pop().toUpperCase() : "-";
    },
    getFileSize() {
      // تستی فقط نمایش عدد فرضی - چون حجم واقعی رو سمت کلاینت نداریم
      return "320KB";
    },
  },
};
</script>

<style scoped>
.file-modal-overlay {
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

.file-modal-content {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  padding: 26px;
  border-radius: 8px;
  width: 50vmin;
  max-height: 50vmin;
  overflow-y: auto;
}

.file-modal-content::-webkit-scrollbar {
  display: none;
}

.file-modal-content {
  -ms-overflow-style: none;  /* برای IE */
  scrollbar-width: none;     /* برای Firefox */
}


.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.close-btn {
  position: absolute;
  top: 2px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #f5f5f5;
}


.close-btn:hover {
  color: #e74c3c;
}

.file-header {
  display: grid;
  grid-template-columns: 50% 20% 20% 10%;
  font-weight: bold;
  padding: 10px 15px;
  background-color: #1976d2;
  color: #f5f5f5;
  border-radius: 4px;
}

.header-cell-name {
  text-align: left;
}
.header-cell-download {
text-align: right;
}

.file-item {
  display: grid;
  grid-template-columns: 50% 20% 20% 10%;
  align-items: center;
  background-color: #f5f5f5;
  margin-top: 8px;
  padding: 8px 15px;
  border-radius: 4px;
}

.file-name {
  text-align: left;

}

.file-name,
.file-type,
.file-size {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.download-icon {
  text-align: right;
  cursor: pointer;
  font-size: 20px;
  color: #1976d2;
}
</style>
