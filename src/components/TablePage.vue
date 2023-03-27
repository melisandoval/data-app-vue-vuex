<template>
  <div class="table-container">
    <el-table :data="dataChunk" stripe style="width: 100%" :responsive="true">
      <el-table-column prop="id" label="id" width="100" />
      <el-table-column prop="name" label="Name" width="130" />
      <el-table-column prop="value" label="Value" width="100" />
      <el-table-column width="130">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleDisplayMoreInfo(scope.$index, scope.row)"
            class="more-info-button"
            >More info</el-button
          ></template
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
const props = defineProps(["dataChunk"]);

const store = useStore();

const handleDisplayMoreInfo = (index, row) => {
  store.dispatch("setSelectedItemId", row.id);
};
</script>

<style scoped>
.table-container {
  max-width: fit-content;
}

.more-info-button {
  margin: 0.6em 0;
}
</style>
