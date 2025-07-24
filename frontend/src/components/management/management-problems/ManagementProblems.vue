<template>
  <div >
    <div class="problems-wrapper">
      <ProblemList />
    </div>
  </div>
</template>

<script>
import ProblemList from "./ProblemList.vue";

export default {
  name: "ManagementProblems",
  components: {
    ProblemList,
  },
};
</script>

<style scoped>
.problems-wrapper {
  margin: 10px
}
</style>
