<script setup>
import { RouterLink } from 'vue-router';
import Card from "@/components/Card.vue";
</script>
<template>
    <section class="py-4">
      <div class="container-xl lg:container m-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card>
            <h2 class="text-2xl font-bold">Конвертируйте валюту быстро</h2>
            <p class="mt-2 mb-4">
              Введите сумму и получите результат по текущему курсу.
            </p>
            <RouterLink
              to="/converter"
              class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
              Начать конвертацию
            </RouterLink>
          </Card>
          <Card bg="bg-blue-100">
            <h2 class="text-2xl font-bold">Узнайте больше о курсе</h2>
            <p class="mt-2 mb-4">
              Получите информацию о динамике курса валют.
            </p>
            <RouterLink
              to="/analytics"
              class="inline-block bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
              Посмотреть графики
            </RouterLink>
          </Card>
        </div>
      </div>
    </section>
</template>