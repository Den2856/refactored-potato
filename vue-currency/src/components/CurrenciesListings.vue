<script setup>
import { RouterLink } from 'vue-router';
import { reactive, defineProps, onMounted } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import axios from 'axios';

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false
  }
})

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
})
</script>
<template>
    <section class="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-900 px-4 py-10">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-white mb-6 text-center">
          Курсы валют
        </h2>
  
        <div v-if="state.isLoaded" class="text-center text-gray-500 py-6">
          <PulseLoader />
        </div>
  
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="currency in state.currencies.slice(0, limit || state.currencies.length)" 
            :key="currency.id" 
            class="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition-shadow duration-300"
          >
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ currency.name }}</h3>
            <p class="text-gray-800 mb-4">Символ: {{ currency.symbol }}</p>
            <p class="text-gray-800 mb-4">Курс обмена: {{ currency.rate }}</p>
            <p class="text-gray-800 mb-4">Страна: {{ currency.country }}</p>
            <RouterLink
              :to="`/currencies/${currency.id}`"
              class="block text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Посмотреть детали
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  
    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
      <RouterLink
        to="/currencies"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >
        Посмотреть все валюты
      </RouterLink>
    </section>
  </template>