<script setup>
import { ref } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// Данные о валютах
const state = ref({
currencies: [
    { code: "USD", name: "Доллар США", rate: 98.05, change: -1.89 },
    { code: "EUR", name: "Евро", rate: 103.92, change: +3.24 },
    { code: "GBP", name: "Фунт Стерлингов", rate: 120.32, change: -1.69 },
],
});

// Данные для графика
const chartData = ref({
labels: ["01.02", "02.02", "03.02", "04.02", "05.02"],
datasets: [
    {
    label: "USD",
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
    data: [98.26, 98.00, 97.81, 99.94, 98.05],
    },
    {
    label: "EUR",
    backgroundColor: "#16a34a",
    borderColor: "#16a34a",
    data: [102.40, 101.77, 105.13, 100.68, 103.92],
    },
    {
    label: "GBP",
    backgroundColor: "#ff900f",
    borderColor: "#ff900f",
    data: [121.84, 120.86, 123.56, 122.01, 120.32],
    }
],
});

// Настройки графика
const chartOptions = ref({
responsive: true,
plugins: {
    legend: { display: true },
},
});
</script>
<template>
<section class="bg-gray-50 py-10 px-4">
    <div class="container mx-auto max-w-5xl">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">📊 Аналитика валют</h1>


    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          v-for="currency in state.currencies"
          :key="currency.code"
          class="bg-white p-6 rounded-lg shadow-md border border-gray-200"
        >
        <h2 class="text-lg font-semibold text-gray-700">{{ currency.name }} ({{ currency.code }})</h2>
        <p class="text-2xl font-bold text-blue-600 mt-2">{{ currency.rate }} ₽</p>
        <p :class="currency.change >= 0 ? 'text-green-600' : 'text-red-600'">
            {{ currency.change >= 0 ? '▲' : '▼' }} {{ currency.change }} ₽ за 24ч
        </p>
        </div>
    </div>

    <!-- График -->
    <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-bold text-gray-700 mb-4">📈 Динамика курсов</h3>
        <LineChart :chart-data="chartData" :options="chartOptions" />
    </div>
    </div>
</section>
</template>