<template>
  <section class="graph-section">
    <h2>Total items: {{ totalItems }}</h2>
    <p>Total value: {{ totalValue }}</p>
    <p>Average value: {{ averageValue }}</p>
    <Bar :data="data" :options="options" class="bar-graph" />
  </section>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const store = useStore();
// const tableData = ref(null);

const totalItems = computed(() => store.getters.getData?.length);

const totalValue = computed(() => {
  const tableData = store.getters.getData;
  return tableData?.reduce((total, item) => total + item.value, 0);
});

const averageValue = computed(() => {
  if (totalValue && totalItems) {
    return totalValue.value / totalItems.value;
  }
});

const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "#f87979",
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
    {
      label: "Data Two",
      backgroundColor: "#409EFF",
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
  ],
};

const options = reactive({
  responsive: true,
  maintainAspectRatio: false,
});
</script>

<style scoped>
.graph-section {
  width: 100%;
  padding: 2em 0;
  display: grid;
  place-items: center;
}

.bar-graph {
  max-height: 600px;
  padding: 1em;
}
</style>
