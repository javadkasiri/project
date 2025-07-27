<template>
  <div>
    <div :class="['problem-row', { expanded: isExpanded }]">
      <!-- سایر ستون‌ها -->
      <div class="cell customer-id">{{ problem.customerId }}</div>
      <div class="cell title">{{ problem.title }}</div>

      <div class="cell description" @mouseenter="checkTruncation">
        <!-- حالت نمایش معمول -->
        <template v-if="!isEditingDescription">
          <span ref="descRef" class="description-text">
            {{ editableDescription }}
          </span>
          <div
            v-if="isTruncatable"
            class="description-expand-toggle"
            @click.stop="isExpanded = !isExpanded"
          >
            <span class="material-symbols-outlined">
              {{ isExpanded ? "expand_less" : "expand_more" }}
            </span>
          </div>
        </template>

        <!-- حالت ویرایش Description -->
        <template v-else>
          <div class="description-edit-wrapper">
            <textarea
              v-model="editableDescription"
              class="description-input"
              rows="2"
              @input="autoResizeDesc"
              ref="descTextarea"
            ></textarea>

            <!-- دکمه تأیید برای خروج از حالت ادیت -->
            <button
              class="confirm-button"
              @click="isEditingDescription = false"
            >
              Confirm
            </button>
          </div>
        </template>
      </div>

      <div class="cell created-by">{{ problem.createdBy }}</div>
      <div class="cell created-at">{{ formatDate(problem.createdAt) }}</div>

      <div class="cell status">
        <span :class="['status-badge', problem.status]">
          {{ problem.status }}
        </span>
      </div>

      <div class="cell icons">
        <span class="material-symbols-outlined icon-button" title="View Image">
          image
        </span>

        <!-- آیکون ویرایش برای Description -->
        <span
          v-if="!isEditingDescription"
          class="material-symbols-outlined icon-button"
          title="Edit"
          @click="isEditingDescription = true"
        >
          edit
        </span>
        <span
          v-else
          class="material-symbols-outlined icon-button"
          title="Attach File"
        >
          attach_file
        </span>

        <span class="material-symbols-outlined icon-button" title="Delete">
          delete
        </span>
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

    <!-- پاسخ -->
    <div v-if="isOpen" class="response-box">
      <!-- وضعیت Pending -->
      <template v-if="problem.status === 'Pending'">
        <div class="note-pending-box">
          <label class="note-label"><strong>Note:</strong></label>
          <textarea
            v-model="editableNote"
            class="note-input"
            ref="noteInput"
            @input="autoResize"
            rows="1"
          />

          <span class="material-symbols-outlined attach-icon"
          title="Attach File">
            attach_file
          </span>

          <div class="pending-buttons">
            <button class="btn-resolved" @click="markAsResolved">
              Resolved
            </button>

            <button class="btn-reviewing" @click="markAsReviewing">
              Reviewing
            </button>
          </div>
        </div>
      </template>

      <!-- وضعیت Reviewing و Resolved -->
      <template v-else>
  <div class="note-resolved-box">
    <!-- حالت نمایش فقط متن -->
    <div
      v-if="!isEditingNote"
      class="note-display"
    >
      {{ editableNote }}
    </div>

    <!-- حالت ویرایش Note -->
    <textarea
      v-else
      v-model="editableNote"
      class="note-display editable"
      @input="autoResize"
      ref="noteInput"
      rows="1"
    ></textarea>

    <div class="note-bottom-row">
      <div class="review-meta">
        <span><strong>Reviewed By:</strong> {{ problem.reviewedBy }}</span>
        <span><strong>Reviewed At:</strong> {{ formatDate(problem.reviewedAt) }}</span>
      </div>

      <!-- دکمه‌ها -->
      <div class="resolved-buttons">
        <span class="material-symbols-outlined icon-button" title="View Image">image</span>

        <span
          v-if="!isEditingNote"
          class="material-symbols-outlined icon-button"
          @click="startNoteEdit"
          title="Edit"
        >
          edit
        </span>

        <span
          v-else
          class="material-symbols-outlined icon-button"
          title="Attach File"
        >
          attach_file
        </span>

        <button class="btn-resolved" @click="markAsResolved">
          Resolved
        </button>

        <button class="btn-reviewing" @click="markAsReviewing">
          Reviewing
        </button>
      </div>
    </div>
  </div>
</template>

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

      isEditingDescription: false,
      isEditingNote: false,

      editableDescription: this.problem.description,
      editableNote: this.problem.note || "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.checkTruncation();
      this.autoResize();
    });
  },
  
  methods: {
    toggleResponse() {
      this.isOpen = !this.isOpen;
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
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
    autoResize() {
      this.$nextTick(() => {
        const textarea = this.$refs.noteInput;
        if (textarea) {
          textarea.style.height = "auto";
          textarea.style.height = textarea.scrollHeight + "px";
        }
      });
    },
    autoResizeDesc() {
      const el = this.$refs.descTextarea;
      if (el) {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
      }
    },
    startNoteEdit() {
      this.isEditingNote = true;
      this.$nextTick(() => this.autoResize());
    },
    markAsResolved() {
      this.isEditingNote = false;
      this.isOpen = false; // بستن پنل پاسخ
      this.emitUpdatedProblem("Resolved"); // ارسال مقدار جدید به والد
    },

    markAsReviewing() {
      this.isEditingNote = false;
      this.isOpen = false;
      this.emitUpdatedProblem("Reviewing");
    },
    emitUpdatedProblem(status) {
      this.$emit("update-problem", {
        ...this.problem,
        description: this.editableDescription,
        note: this.editableNote,
        status: status || this.problem.status,
        reviewedAt: new Date().toISOString(),
      });
    },
  },
};
</script>

<style scoped>
.problem-row {
  display: grid;
  grid-template-columns:
    1fr /* Customer ID */
    1fr /* Title */
    3fr /* Description */
    1fr /* Created By */
    1.2fr /* Created At */
    0.8fr /* Status */
    0.8fr /* Actions */
    0.8fr; /* Response */
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
.description-edit-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  margin-top: 4px;
  width: 100%;
}
.description-input {
  width: 100%;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  line-height: 1.4;
  resize: none;
  overflow: hidden;
  font-family: "Vazirmatn", sans-serif;
  background: #fff;
  box-sizing: border-box;
  min-height: 80px;
}
.confirm-button {
  padding: 4px 8px;
  font-weight: bold;
  color: white;
  background-color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cell.icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}
.icon-button {
  cursor: pointer;
  color: #333;
  font-size: 24px;
  transition: color 0.2s ease;
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
  align-items: center;
  background-color: #e5e5e5;
  padding: 10px 26px;
  border-top: 1px solid #ddd;
  box-sizing: border-box;
  gap: 12px; /* فاصله بین آیتم‌ها */
}
/* pending*/
.note-pending-box {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
}
.note-label {
  white-space: nowrap;
  padding-top: 8px;
}
.note-container {
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
}
.note-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 6px;
}
.note-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.note-input {
  flex: 1;
  max-width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #aaa;
  min-height: 32px;
  resize: none;
  line-height: 20px;
  font-family: "Vazirmatn", sans-serif;
  overflow: hidden;
  box-sizing: border-box;
}
.attach-icon {
  font-size: 22px;
  color: #555;
  cursor: pointer;
  user-select: none;
  margin-left: -3px; /* نزدیک‌تر به دکمه‌ها */
  padding-top: 7px;
}
.pending-buttons {
  display: flex;
  gap: 8px;
  margin-top: 4px;
  margin-left: auto;
}

/* resolved*/
.note-resolved-box {
  width: 100%;
  background: #e5e5e5;
  padding: 10px 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.note-display {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #fff;
  background-color: #fff;
  box-sizing: border-box;
  line-height: 20px;
  font-family: "Vazirmatn", sans-serif;
  white-space: pre-wrap;
  word-break: break-word;
  text-align: left
}

/* در حالت فعال شدن ادیت */
.note-display.editable {
  border: 1px solid #aaa;
  resize: none;
  outline: none;
  overflow: hidden;
  cursor: text;
}
/* در فوکوس فقط در صورت فعال بودن ادیت */
.note-display.editable:focus {
  border: 2px solid #333;
}

/* اگر فوکوس گرفت ولی ادیت فعال نبود، دوباره سفید باشه */
.note-display:not(.editable):focus {
  border: 1px solid #fff;
  outline: none;
}

.note-bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.review-meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #333;
  flex-wrap: wrap;
}
.review-meta span strong {
  color: #000;
}
.resolved-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
}

.review-meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #333;
  flex-wrap: wrap;
}
.review-meta span strong {
  color: #000;
}

.btn-reviewing,
.btn-resolved {
  padding: 6px 12px;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-resolved {
  background-color: #4caf50;
}
.btn-reviewing {
  background-color: #42a5f5;
}
</style>
