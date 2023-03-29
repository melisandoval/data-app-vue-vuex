<template>
  <el-dialog v-if="data" title="Item information">
    <el-descriptions :column="1">
      <el-descriptions-item label="Id:">{{ data.id }}</el-descriptions-item>
      <el-descriptions-item label="Created at:">{{
        transformDate(data.date)
      }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions direction="vertical">
      <el-descriptions-item label="Description">
        {{ data.description }}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>

  <el-dialog v-else-if="!data">
    <p>Loading...</p>
  </el-dialog>

  <el-dialog v-else>
    <p class="error-message">{{ errorMsg }}</p>
  </el-dialog>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, watch } from "vue";
import { transformDate } from "../utils/dataUtils";

const store = useStore();

const data = ref(null);
// const loading = ref(true);
const error = ref(false);

const errorMsg =
  store.getters.getItemDetailsError ||
  "Sorry, we can't display the data now. Please try again later.";

watch(
  () => store.getters.getCurrentSelectedItemId,
  async () => {
    try {
      await store.dispatch(
        "fetchItemDetails",
        store.getters.getCurrentSelectedItemId
      );
      data.value = store.getters.getItemDetails;

      if (!data.value) {
        error.value = true;
      }
    } catch (err) {
      console.log(err.message);
    }
  }
);
</script>

<style scoped>
.el-descriptions {
  padding: 0.5em;
}

.error-message {
  padding-bottom: 1em;
}
</style>
