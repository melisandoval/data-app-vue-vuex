<template>
  <header>
    <h1>Data App</h1>
  </header>

  <main>
    <ItemMoreInfoModal v-model="itemMoreInfoModalVisible" />
    <div class="content-container">
      <div v-if="error" class="error-message-container">
        <h2>{{ errorMsg }}</h2>
      </div>
      <TablesSection v-if="data" :dataChunk="dataChunk" />
    </div>
  </main>
  <Footer />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { getChunk } from "./utils/dataUtils";
import Footer from "./components/Footer.vue";
import TablesSection from "./components/TableSection.vue";
import ItemMoreInfoModal from "./components/ItemMoreInfoModal.vue";

const store = useStore();

const data = ref(null);
const dataChunk = ref(null);

const loading = ref(true);

const error = ref(false);
const errorMsg =
  store.getters.getDataError ??
  "Sorry, we can't display the data now. Please try again later.";

const itemMoreInfoModalVisible = ref(false);

onMounted(async () => {
  try {
    await store.dispatch("fetchData");
    data.value = store.getters.getData;

    if (!data) {
      error.value = true;
    }
    dataChunk.value = getChunk(data?.value, 1);
  } catch (err) {
    console.log(err.message);
  }
});

watch(
  () => store.getters.getCurrentTablePage,
  (newStateValue) => {
    dataChunk.value = getChunk(data.value, newStateValue);
  }
);

watch(
  () => store.getters.getCurrentSelectedItemId,
  () => {
    itemMoreInfoModalVisible.value = true;
  }
);
</script>

<style scoped>
.content-container {
  width: 100%;
  min-height: 85vh;
  display: grid;
  place-items: center;
}
</style>
