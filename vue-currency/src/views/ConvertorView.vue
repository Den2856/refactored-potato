<script setup>
import { RouterLink } from 'vue-router';
import { reactive, defineProps, onMounted, ref, computed } from 'vue'
import { Motion } from "@oku-ui/motion";
import axios from 'axios';

const state = reactive({
  currencies: [],
  isLoaded: true
});

onMounted(async () => {
    try {
        const response = await axios.get('/api/currencies');
        state.currencies = response.data;
    } catch (error) {
      console.error('Error fetching currencies', error)
    } finally {
        state.isLoaded = false;
    }
});

const steps = ["Направление", "Завершение"];
const activeStep = ref(1);

const fromCurrency = ref("");
const toCurrency = ref("");
const amount = ref(0);

const exchangeRate = computed(() => {
  const fromRate = state.currencies.find((c) => c.code === fromCurrency.value)?.rate || 1;
  const toRate = state.currencies.find((c) => c.code === toCurrency.value)?.rate || 1;
  return (fromRate / toRate).toFixed(6);
});

const convertedAmount = computed(() => {
  return (amount.value * exchangeRate.value).toFixed(2);
});

const reserve = computed(() => {
  return state.currencies.find((c) => c.code === toCurrency.value)?.reserve || 0;
});


const isFormComplete = computed(() => {
  return fromCurrency.value && toCurrency.value && amount.value > 0;
});

const completeConversion = () => {
  if (activeStep.value === 1 && isFormComplete.value) {
    activeStep.value = 2;
  }
};

const resetForm = () => {
  activeStep.value = 1;
  fromCurrency.value = "";
  toCurrency.value = "";
  amount.value = 0;
};

</script>
<template class="bg-gray-50">
  <section class="py-10 px-4">
    <div class="container mx-auto max-w-4xl bg-white shadow-md rounded-lg p-6">
      <div class="flex justify-center gap-32 mb-8">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="flex items-center space-x-2"
          :class="activeStep >= index + 1 ? 'text-blue-600' : 'text-gray-400'"
        >
          <Motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 0.3 }"
          >
          <span
            :class="activeStep >= index + 1 ? 'font-bold' : ''"
            class="mr-4 text-3xl"
          >
            {{ index + 1 }}
          </span>
            <span class="text-2xl">{{ step }}</span>
          </Motion>
        </div>
      </div>

      <Motion
        :initial="{ opacity: 0, x: -100 }"
        :animate="{ opacity: activeStep === 1 ? 1 : 0, x: activeStep === 1 ? 0 : 100 }"
        :transition="{ duration: 0.5 }"
        v-show="activeStep === 1"
        class="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <h3 class="text-xl font-bold text-blue-600 mb-4">ПРОДАВ</h3>
          <div class="flex items-center space-x-4">
            <select
              v-model="fromCurrency"
              @change="updateStep"
              class="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option
                v-for="currency in state.currencies"
                :key="currency.code"
                :value="currency.code"
              >
                {{ currency.name }} {{ currency.symbol }}
              </option>
            </select>
          </div>
          <input
            v-model.number="amount"
            @input="updateStep"
            type="number"
            placeholder="Введите сумму"
            class="mt-4 w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <p class="text-gray-500 text-sm mt-2">
            Курс обмена: {{ exchangeRate }} = 1 {{ fromCurrency }}
          </p>
        </div>

        <div>
          <h3 class="text-xl font-bold text-blue-600 mb-4">ПОЛУЧИТЕ</h3>
          <div class="flex items-center space-x-4">
            <select
              v-model="toCurrency"
              @change="updateStep"
              class="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option
                v-for="currency in state.currencies"
                :key="currency.code"
                :value="currency.code"
              >
                {{ currency.name }} {{ currency.symbol }}
              </option>
            </select>
          </div>
          <input
            type="text"
            min="0"
            :value="convertedAmount"
            class="mt-4 w-full border border-gray-300 rounded-lg px-4 py-2"
            disabled
          />
          <p class="text-gray-500 text-sm mt-2">
            Резерв валюты: {{ toCurrency }}
          </p>
        </div>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: -50 }"
        :animate="{ opacity: activeStep === 2 ? 1 : 0, y: activeStep === 2 ? 0 : 50 }"
        :transition="{ duration: 0.5 }"
        v-show="activeStep === 2"
        class="text-center mt-8"
      >
        <h2 class="text-2xl font-bold">Конвертация завершена</h2>
        <p class="text-gray-600 mt-4">
          Вы получите {{ convertedAmount }} {{ toCurrency }}
        </p>
      </Motion>

      <div class="text-center mt-8">
        <button
          :disabled="!isFormComplete"
          @click="activeStep === 1 ? completeConversion() : resetForm()"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 cursor-pointer"
        >
          {{ activeStep === 1 ? 'Конвертировать' : 'Готово' }}
        </button>
      </div>
    </div>
  </section>
</template>