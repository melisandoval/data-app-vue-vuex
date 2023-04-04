<template>
  <section class="table-section" v-if="dataChunk">
    <TablePage
      :dataChunk="dataChunk"
      @onMoreInfoButtonClicked="handleEmitDisplayMoreInfo"
    />
    <Pagination />
  </section>
</template>

<script setup>
import TablePage from "./TablePage.vue";
import Pagination from "./Pagination.vue";

const props = defineProps(["dataChunk"]);
const emit = defineEmits(["onMoreInfoButtonClicked"]);

function handleEmitDisplayMoreInfo() {
  emit("onMoreInfoButtonClicked");
}
</script>

<style scoped>
.table-section {
  padding: 4em 0 2em;
  max-width: 100%;
}
</style>
