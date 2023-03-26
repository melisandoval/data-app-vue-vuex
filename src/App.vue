<template>
  <header>
    <h1>Data App</h1>
  </header>

  <main>
    <div>
      <ul>
        <li v-for="item in data" :key="item.id">{{ item.name }}</li>
      </ul>
      <p v-if="error">{{ error }}</p>
    </div>
  </main>

  <Footer />
</template>

<script setup>
import Footer from "./components/Footer.vue";

import { ref, onMounted } from "vue";
import { useStore } from "vuex";

const data = ref([]);
const error = ref(null);

onMounted(async () => {
  const store = useStore();
  try {
    await store.dispatch("fetchData");
    data.value = store.getters.getData;
    error.value = store.getters.getDataError;
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
});
</script>

<style scoped></style>
