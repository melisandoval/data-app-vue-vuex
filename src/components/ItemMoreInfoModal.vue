<template>
  <el-dialog v-if="data" title="Item information">
    <el-descriptions :column="1">
      <el-descriptions-item label="Id:">{{ data.id }}</el-descriptions-item>
      <el-descriptions-item label="Created at:">{{
        data.date
      }}</el-descriptions-item>
    </el-descriptions>

    <el-descriptions direction="vertical">
      <el-descriptions-item label="Description">
        {{ data.description }}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, watch } from "vue";

const store = useStore();

const data = ref(null);
const errorMsg = ref(null);

watch(
  () => store.getters.getCurrentSelectedItemId,
  async () => {
    console.log(store.getters.getCurrentSelectedItemId);
    try {
      await store.dispatch(
        "fetchItemDetails",
        store.getters.getCurrentSelectedItemId
      );
      data.value = store.getters.getItemDetails;
      console.log(data.value);
    } catch (err) {
      console.log(err.message);
      errorMsg.value =
        "Sorry, we can't display the data now. Please try again later.";
    }
  }
);
</script>

<style scoped>
.el-descriptions {
  padding: 1em;
}
</style>
