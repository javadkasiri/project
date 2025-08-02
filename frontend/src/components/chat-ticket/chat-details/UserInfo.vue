<template>
  <div class="user-info">
    <div class="avatar">
      <span class="material-symbols-outlined">person</span>
    </div>

    <div class="name">{{ sender }}</div>
    <div class="customerId">{{ customerId }}</div>

    <div class="actions">
      <span class="material-symbols-outlined">mail</span>
      <span class="material-symbols-outlined">chat</span>
      <span class="material-symbols-outlined">call</span>
    </div>

    <div class="buttons">
      <button class="button" @click="showProblemsModal = true">
        Problems <span v-if="problemCount">({{ problemCount }})</span>
      </button>

      <button class="button" @click="showForm = !showForm">Add Problem</button>
    </div>

    <div v-if="showForm" class="add-problem-form">
      <input
        type="text"
        v-model="newProblem.title"
        placeholder="Title"
        class="form-input"
      />
      <textarea
        v-model="newProblem.description"
        placeholder="Description"
        class="form-textarea"
      ></textarea>
      <button class="submit-button" @click="submitProblem">Submit</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>

  <!-- پاپ‌آپ ProblemList -->
  <div v-if="showProblemsModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <ProblemList
        :customerId="customerId"
        :isModal="true"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script>
import ProblemList from "@/components/management/management-problems/ProblemList.vue";

export default {
  components: {
    ProblemList,
  },
  data() {
    return {
      showForm: false,
      newProblem: {
        title: "",
        description: "",
      },
      errorMessage: "",
      showProblemsModal: false,
      problemCount: 0,
    };
  },
  props: {
    customerId: String,
    sender: String,
    resetFormTrigger: Number,
  },
  watch: {
    resetFormTrigger() {
      this.showForm = false;
      this.newProblem.title = "";
      this.newProblem.description = "";
      this.errorMessage = "";
    },
  },
  mounted() {
    this.fetchProblemCount();
  },
  methods: {
    closeModal() {
      this.showProblemsModal = false;
    },
    async fetchProblemCount() {
      if (!this.customerId) return;
      try {
        const res = await fetch(
          "http://localhost:3000/api/dumdb/vueapp/problems",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "get",
              filter: { customerId: this.customerId }, // حتماً از فیلتر استفاده کن
            }),
          }
        );
        const json = await res.json();
        this.problemCount = json.result?.length || 0;
      } catch (err) {
        console.error("Error fetching problem count:", err);
      }
    },
    async submitProblem() {
      if (!this.newProblem.title || !this.newProblem.description) {
        this.errorMessage =
          "Please enter the title and description of the problem";
        return;
      }

      this.errorMessage = "";

      const res = await fetch(
        "http://localhost:3000/api/dumdb/vueapp/problems",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "create",
            data: {
              customerId: this.customerId,
              title: this.newProblem.title,
              description: this.newProblem.description,
              status: "Pending",
              createdAt: new Date().toISOString(),
              createdBy: "Customer Support",
            },
          }),
        }
      );

      if (res.ok) {
        this.newProblem.title = "";
        this.newProblem.description = "";
        this.showForm = false;
        this.fetchProblemCount(); // ✅ به‌روزرسانی تعداد بعد از ارسال
      }
    },
  },
};
</script>

<style scoped>
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin: 10px 15px 15px;
  min-width: 210px;
  max-width: 210px;
}

.avatar {
  width: 60px;
  height: 60px;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

.name {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 4px;
}

.customerId {
  font-size: 14px;
  color: #777;
  margin-bottom: 16px;
}

.actions {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.actions .material-symbols-outlined {
  font-size: 24px;
  color: #555;
  cursor: pointer;
}
.avatar .material-symbols-outlined {
  font-size: 30px; /* یا هر عدد دلخواه */
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.button {
  display: block;
  width: 100%;
  text-align: center;
  background-color: #f2f6fc;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  color: #2196f3;
  font-weight: 500;
  font-size: 15px;
  transition: background-color 0.2s;
  text-decoration: none;
  border: none;
  font-family: inherit;
}

.button:hover {
  background-color: #e3f2fd;
}

.add-problem-form {
  margin-top: 16px;
  min-width: 210px;
  max-width: 210px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-input,
.form-textarea {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
  max-height: 320px;
  overflow-y: auto;
  scrollbar-width: none;
}

.submit-button {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.submit-button:hover {
  background-color: #1976d2;
}

.error-message {
  color: #d32f2f;
  font-size: 13px;
  margin-top: -4px;
  margin-bottom: 4px;
  text-align: center;
}

/* پاپ‌آپ modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
}
.modal-content {
  background: white;
  border-radius: 12px;
  padding: 16px;
  width: 80vw;
  min-width: 1200px;
  max-width: 1200px;
  height: 80vh;
  max-height: 80vh;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
</style>
