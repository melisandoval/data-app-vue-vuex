<template>
  <div class="app-content-container" v-if="data">
    <header>
      <h1>Data App</h1>
    </header>

    <main>
      <ItemMoreInfoModal v-model="itemMoreInfoModalVisible" />
      <div class="main-content-container">
        <TablesSection :dataChunk="dataChunk" />
        <GraphSection />
      </div>
    </main>
  </div>

  <div v-if="error" class="error-message-container">
    <h2>{{ errorMsg }}</h2>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { getChunk } from "./utils/dataUtils";
import Footer from "./components/Footer.vue";
import TablesSection from "./components/TableSection.vue";
import ItemMoreInfoModal from "./components/ItemMoreInfoModal.vue";
import { ElLoading } from "element-plus";
import GraphSection from "./components/GraphSection.vue";

const store = useStore();

const data = ref(null);
const dataChunk = ref(null);

const error = ref(false);
const errorMsg =
  store.getters.getDataError ??
  "Sorry, we can't display the data now. Please try again later.";

const itemMoreInfoModalVisible = ref(false);

onMounted(async () => {
  const loading = ElLoading.service({ fullscreen: true });
  try {
    await store.dispatch("fetchData");
    data.value = store.getters.getData;

    if (!data) {
      error.value = true;
    }

    if (data) {
      loading.close();
      dataChunk.value = getChunk(data.value, 1);
    }
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
.app-content-container {
  max-width: 100%;
  min-height: 85vh;
  padding: 1em;
}

.main-content-container {
  max-width: 100%;
  padding: 4em 0 2em;
}

@media screen and (min-width: 1440px) {
  main {
    display: grid;
    place-items: center;
  }
  .main-content-container {
    max-width: 1200px;
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    gap: 4em;
  }
}
</style>
