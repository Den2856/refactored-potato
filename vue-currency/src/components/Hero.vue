<script setup>
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    default: 'Удобный конвертер валют онлайн'
  },
  subtitle: {
    type: String,
    default: 'Быстро конвертируйте валюту по актуальным курсам'
  }
})
</script>
<template>
    <section class="bg-blue-800 py-20 mb-4">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
      >
        <div class="text-center">
          <h1
            class="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
          >
            {{ title }}
          </h1>
          <p class="my-4 text-2xl text-white">
            {{ subtitle }}
          </p>
        </div>
      </div>
    </section>
</template>