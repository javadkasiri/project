<template>
  <div class="customer-problems">
    <ProblemList :customerId="customerId" />
  </div>
</template>

<script>
import ProblemList from "@/components/management/management-problems/ProblemList.vue";

export default {
  name: "CustomerProblems",
  components: { ProblemList },
  computed: {
    customerId() {
      return this.$route.params.customerId;
    }
  }
};
</script>

<style scoped>
.customer-problems {
  padding: 24px;
  background: #fff;
}
</style>
