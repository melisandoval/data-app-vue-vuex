<template>
  <section class="graph-section">
    <Bar :data="valueBarData" :options="valueBarOptions" class="bar-graph" />
    <Bar :data="itemsBarData" :options="itemsBarOptions" class="bar-graph" />
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

const totalItems = computed(() => store.getters.getData?.length);
const itemsEqualOrGreaterThan50 = computed(() => {
  const tableData = store.getters.getData;
  return tableData.filter((item) => item.value >= 50).length;
});
const itemsGraphData = [totalItems.value, itemsEqualOrGreaterThan50.value];

const totalValue = computed(() => {
  const tableData = store.getters.getData;
  return tableData.reduce((total, obj) => total + obj.value, 0);
});
const averageValue = computed(() => totalValue.value / totalItems.value);
const valueGraphData = [totalValue.value, averageValue.value];

const itemsBarData = {
  labels: ["Total", "With>=50 value"],
  datasets: [
    {
      label: "Items",
      backgroundColor: "#909399",
      data: itemsGraphData,
    },
  ],
};

const itemsBarOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  scale: {
    max: 60,
  },
});

const valueBarData = {
  labels: ["Total", "Average"],
  datasets: [
    {
      label: "Value",
      backgroundColor: "#409eff",
      data: valueGraphData,
    },
  ],
};

const valueBarOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  scale: {
    max: 6000,
  },
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
  max-height: 350px;
  padding: 1em;
}
</style>
