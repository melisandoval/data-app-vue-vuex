<template>
  <div class="pagination-container">
    <el-pagination
      :page-size="10"
      :pager-count="5"
      layout="prev, pager, next"
      :total="50"
      v-model="currentPage"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const currentPage = ref(store.getters.getCurrentTablePage);

function handlePageChange(page) {
  store.dispatch("setCurrentTablePage", page);
}
</script>

<style scoped>
.pagination-container {
  width: 100%;
  display: grid;
  place-items: center;
  padding: 1.5em 1em;
}
</style>
