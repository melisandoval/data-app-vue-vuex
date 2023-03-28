<template>
  <div class="table-container">
    <el-table
      :v-loading="loading"
      :data="dataChunk"
      border
      stripe
      :responsive="true"
    >
      <el-table-column prop="id" label="id" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="value" label="Value" />
      <el-table-column width="100px">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleDisplayMoreInfo(scope.row)"
            class="more-info-button"
            >More info</el-button
          ></template
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const props = defineProps(["dataChunk"]);

const store = useStore();

const loading = ref(true);

const handleDisplayMoreInfo = (row) => {
  store.dispatch("setSelectedItemId", row.id);
};
</script>

<style scoped>
.table-container {
  width: 100%;
}

.more-info-button {
  margin: 0.6em 0;
}

.button-container {
  display: grid;
  place-items: center;
}
</style>
