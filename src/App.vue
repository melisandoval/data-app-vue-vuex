<template>
  <header>
    <h1>Data App</h1>
  </header>

  <main>
    <p v-if="error">{{ error }}</p>

    <section class="table-section" v-if="dataChunk">
      <Table :data="dataChunk" />
    </section>

    <Pagination />
  </main>

  <Footer />
</template>

<script setup>
import { ref, onMounted, watch, computed, reactive } from "vue";
import { useStore } from "vuex";
import Pagination from "./components/Pagination.vue";
import Footer from "./components/Footer.vue";
import Table from "./components/Table.vue";

const store = useStore();

const data = ref([]);
const error = ref(null);
const dataChunk = ref(null);
// const tablePage = ref(store.getters.getCurrentTablePage);

function getChunk(array, chunkNumber) {
  const chunkSize = 10;
  const startIndex = (chunkNumber - 1) * chunkSize;
  const endIndex = startIndex + chunkSize;
  return array.slice(startIndex, endIndex);
}

onMounted(async () => {
  try {
    await store.dispatch("fetchData");
    data.value = store.getters.getData;
    error.value = store.getters.getDataError;
    dataChunk.value = getChunk(data.value, 1);
  } catch (err) {
    console.log(err.message);
  }
});

watch(
  () => store.getters.getCurrentTablePage,
  (newValue, oldValue) => {
    console.log(`currentTablePage changed from ${oldValue} to ${newValue}`);
    dataChunk.value = getChunk(data.value, store.getters.getCurrentTablePage);
  }
);
</script>

<style scoped>
.table-section {
  max-width: max-content;
}
</style>
