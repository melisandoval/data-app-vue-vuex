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
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const currentPage = ref(store.getters.getCurrentTablePage);
// const totalItems = computed(() => store.state.data?.length);

function handlePageChange(page) {
  store.dispatch("setCurrentTablePage", page);
  console.log(`Current page: ${store.getters.getCurrentTablePage}`);
}
</script>

<style scoped>
.pagination-container {
  width: 100%;
  display: grid;
  place-items: center;
  padding: 1em;
}
</style>
