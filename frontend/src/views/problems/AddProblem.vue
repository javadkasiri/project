<template>
  <div class="add-problem-page">
    <h2>Add Problem for {{ customerId }}</h2>
    <textarea v-model="problemText" placeholder="Enter the problem here..." />
    <button @click="submitProblem">Submit</button>
  </div>
</template>

<script>
export default {
  name: "AddProblemPage",
  props: ["customerId"],
  data() {
    return {
      problemText: "",
    };
  },
  methods: {
    async submitProblem() {
      if (!this.problemText.trim()) return alert("Please enter a problem.");
      try {
        await fetch("http://localhost:3000/api/dumdb/vueapp/problems", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId: this.customerId,
            text: this.problemText,
            time: new Date(),
          }),
        });
        alert("Problem submitted!");
        this.$router.push("/management/problems"); // بازگشت به لیست مشکلات
      } catch (err) {
        console.error("Error adding problem:", err);
      }
    },
  },
};
</script>
