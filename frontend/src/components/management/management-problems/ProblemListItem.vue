<template>
  <div>
    <div :class="['problem-row', { expanded: isExpanded }]">
      <div class="cell customer-id">{{ problem.customerId }}</div>
      <div class="cell title">{{ problem.title }}</div>

      <div class="cell description" @mouseenter="checkTruncation">
        <span ref="descRef" class="description-text">
          {{ problem.description }}
        </span>

        <!-- نوار آبی با فلش -->
        <div
          v-if="isTruncatable"
          class="description-expand-toggle"
          @click.stop="isExpanded = !isExpanded"
        >
          <span class="material-symbols-outlined">
            {{ isExpanded ? "expand_less" : "expand_more" }}
          </span>
        </div>
      </div>

      <div class="cell created-by">{{ problem.createdBy }}</div>

      <div class="cell created-at">
        {{ formatDate(problem.createdAt) }}
      </div>

      <div class="cell status">
        <span :class="['status-badge', problem.status]">
          {{ problem.status }}
        </span>
      </div>

      <div class="cell icons">
        <span class="material-symbols-outlined">edit</span>
        <span class="material-symbols-outlined">delete</span>
      </div>

      <div class="cell response-toggle">
        <button class="view-button" @click.stop="toggleResponse">
          View
          <span class="material-symbols-outlined">
            {{ isOpen ? "expand_less" : "expand_more" }}
          </span>
        </button>
      </div>
    </div>

    <!-- بخش پاسخ -->
    <div v-if="isOpen" class="response-box">
      <p><strong>Reviewed By:</strong> {{ problem.reviewedBy }}</p>
      <p><strong>Reviewed At:</strong> {{ formatDate(problem.reviewedAt) }}</p>
      <p class="note">
        <strong class="blue-note">Note:</strong> {{ problem.note }}
      </p>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    problem: Object,
  },
  data() {
    return {
      isOpen: false,
      isExpanded: false,
      isTruncatable: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.checkTruncation();
    });
  },
  methods: {
    toggleResponse() {
      this.isOpen = !this.isOpen;
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    },
    checkTruncation() {
  this.$nextTick(() => {
    const el = this.$refs.descRef;
    if (!el) return; 

    if (!this.isExpanded) {
      this.isTruncatable = el.scrollHeight > el.offsetHeight;
    } else {
      this.isTruncatable = true;
    }
  });
},
  },
};
</script>

<style scoped>
.problem-row {
  display: grid;
  grid-template-columns:
    1fr     /* Customer ID */
    1fr     /* Title */
    3fr     /* Description */
    1fr     /* Created By */
    1.2fr   /* Created At */
    0.8fr   /* Status */
    0.8fr   /* Actions */
    0.8fr;  /* Response */
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 10px 6px 10px 10px;
  column-gap: 8px;
}

/* اصلاح مهم: حذف width از .cell */
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 4px;
  box-sizing: border-box;
  min-height: 50px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  position: relative;
}

/* مخصوص description برای چپ‌چینی محتوا */
.cell.description {
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 12px;
  padding-right: 28px; /* فضا برای فلش */
  text-align: left;
}
.cell.description.clickable {
  cursor: pointer;
}

.description-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 1.4;
  word-break: break-word;
  width: 100%;
  text-align: justify;
}

/* حالت باز شده */
.problem-row.expanded .description-text {
  -webkit-line-clamp: unset;
  display: block;
}
.description-expand-toggle {
  position: absolute;
  top: 0;
  right: 8px;
  width: 6px;
  height: 100%;
  background-color: #2196f3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0;
}

.description-expand-toggle .material-symbols-outlined {
  color: white;
  font-size: 22px;
  pointer-events: none;
}


.view-button {
  background-color: transparent;
  border: none;
  font-weight: bold;
  color: #007bff;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* وضعیت‌ها */
.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  color: white;
}
.status-badge.Pending {
  background: #ffc107;
}
.status-badge.Reviewing {
  background: #42a5f5;
}
.status-badge.Resolved {
  background: #4caf50;
}

/* جعبه پاسخ */
.response-box {
  display: flex;
  flex-direction: row; /* ترتیب چپ به راست */
  align-items: center;
  background-color: #e5e5e5;
  padding: 10px 26px;
  border-top: 1px solid #ddd;
  box-sizing: border-box;
  gap: 10px; /* فاصله بین آیتم‌ها */
}
.response-box .note strong {
  color: #42a5f5 !important;
}
</style>
