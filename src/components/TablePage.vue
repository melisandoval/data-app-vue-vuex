<template>
  <div class="table-container">
    <el-table :data="data" stripe style="width: 100%" :responsive="true">
      <el-table-column prop="id" label="id" width="100" />
      <el-table-column prop="name" label="Name" width="130" />
      <el-table-column prop="value" label="Value" width="100" />
      <el-table-column width="130"> <ButtonMoreInfo /></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import ButtonMoreInfo from "./ButtonMoreInfo.vue";

const props = defineProps(["data"]);
</script>

<style scoped>
.table-container {
  max-width: fit-content;
}
</style>
