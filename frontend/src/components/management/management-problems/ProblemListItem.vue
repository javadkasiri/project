<template>
  <div class="problem-row">
    <div>{{ problem.customerId }}</div>
    <div>{{ problem.title }}</div>
    <div>{{ problem.description }}</div>
    <div>{{ problem.createdBy }}</div>
    <div>{{ formattedDate }}</div>
    <div>
    <span :class="['status', problem.status]">
    {{ problem.status }}
  </span>
    </div>
    <div class="icons">
      <span class="material-symbols-outlined">edit</span>
      <span class="material-symbols-outlined">delete</span>
    </div>
    <div class="Response">
      <button @click="toggleResponse">
        View
        <span class="material-symbols-outlined">
          {{ isOpen ? 'expand_less' : 'expand_more' }}
        </span>
      </button>
      <div v-if="isOpen" class="Response-box">
        <p><strong>Note:</strong> {{ problem.note }}</p>
        <p><strong>Reviewed By:</strong> {{ problem.reviewedBy }}</p>
        <p><strong>Reviewed At:</strong> {{ formatDate(problem.reviewedAt) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProblemListItem',
  props: {
    problem: Object
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    formattedDate() {
      return new Date(this.problem.createdAt).toLocaleString();
    }
  },
  methods: {
    toggleResponse() {
      this.isOpen = !this.isOpen;
    },
    formatDate(date) {
      if (!date) return '-';
      return new Date(date).toLocaleString();
    }
  }
};
</script>

<style scoped>
.problem-row {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.status {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  display: inline-block;
}
.status.Pending {
  background: #ffc107; 
}
.status.Reviewing {
  background: #42a5f5; 
}
.status.Resolved {
  background: #4caf50; 
}

.icons {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.material-symbols-outlined {
  cursor: pointer;
  color: #333;
  font-size: 20px;
}

.Response {
  position: relative;
}
.Response button {
  background: none;
  border: none;
  color: #2196f3;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}
.Response-box {
  background: #f8f8f8;
  padding: 10px;
  border-radius: 8px;
  margin-top: 8px;
  font-size: 14px;
}
</style>
