<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { LineChart } from 'vue-chart-3';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

// Регистрация компонентов Chart.js
Chart.register(...registerables);

// Состояние
const state = reactive({
  currency: {
    history: [], // История курсов
  },
  isLoading: true,
});

// Маршрут
const route = useRoute();
const currencyId = route.params.id; // Получение currencyId из параметров маршрута

// Данные для графика
const chartData = reactive({
  labels: [], // Будет заполнено данными из API
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 2,
      tension: 0.4,
    },
  ],
});

// Настройки графика
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

// Конвертер валют
const amount = ref(0);
const targetCurrency = ref("RUB");
const convertedAmount = computed(() => {
  return (amount.value * (state.currency.rate || 1)).toFixed(2);
});

// Функция конвертации
const convertCurrency = () => {
  alert(`Вы получите ${convertedAmount.value} ${targetCurrency.value}`);
};

// Получение данных валюты
onMounted(async () => {
  try {
    const response = await axios.get(`/api/currencies/${currencyId}`);
    console.log("API Response:", response.data); // Проверьте, что приходит от API

    // Обновление состояния
    state.currency = response.data;

    // Заполнение данных для графика
    chartData.labels = response.data.history.map((point) => point.date); // Даты
    chartData.datasets[0].data = response.data.history.map((point) => point.rate); // Курсы
    chartData.datasets[0].label = `Курс ${response.data.name} к рублю`;
  } catch (error) {
    console.error("Error fetching currency data:", error);
  } finally {
    state.isLoading = false;
  }
});
</script>
<template class="bg-gray-50">
  <section class="currency-page py-10 px-4">
    <div v-if="!state.isLoading" class="container mx-auto max-w-4xl bg-white shadow-md rounded-lg p-6">
      <h1 class="text-3xl font-bold mb-6 text-center">
        {{ state.currency.name }} ({{ state.currency.code }})
      </h1>

      <!-- Основная информация -->
      <div class="mb-8">
        <p class="text-lg">Символ: <strong>{{ state.currency.symbol }}</strong></p>
        <p class="text-lg">Используется в: <strong>{{ state.currency.country }}</strong></p>
        <p class="text-lg">Текущий курс: <strong>{{ state.currency.rate }} RUB</strong></p>
      </div>

      <!-- График -->
      <div class="chart-container mb-8">
        <LineChart v-if="chartData.datasets[0].data.length" :chart-data="chartData" :options="chartOptions" />
        <p v-else class="text-gray-500 text-center">Нет данных для отображения графика</p>
      </div>

      <!-- Конвертер -->
      <div class="converter mb-8">
        <h2 class="text-xl font-bold mb-4">Конвертер валют</h2>
        <div class="flex space-x-4">
          <input
            v-model.number="amount"
            type="number"
            placeholder="Введите сумму"
            class="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <button
            @click="convertCurrency"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Конвертировать
          </button>
        </div>
        <div class="mt-4">
          Результат: <strong>{{ convertedAmount }} {{ targetCurrency }}</strong>
        </div>
      </div>

      <!-- Новости -->
      <div class="news mb-8">
        <h2 class="text-xl font-bold mb-4">Последние новости</h2>
        <ul>
          <li v-for="news in state.currency.news" :key="news.id">
            <a :href="news.link" target="_blank" class="text-blue-600 hover:underline">
              {{ news.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="flex justify-center items-center">
      <PulseLoader />
    </div>
  </section>
</template>
