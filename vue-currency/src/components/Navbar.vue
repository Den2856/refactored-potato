<script setup> 
import { RouterLink, useRoute } from 'vue-router';
import { ref } from 'vue'
import logo from '@/assets/img/logo.png'

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath
}

const isOpen = ref(false)

</script>
<template>
  <header class="bg-blue-600 text-white shadow-md">
    <div class="container mx-auto px-4 flex justify-between items-center py-3">

      <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
        <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
        <span class="hidden md:block text-white text-2xl font-bold ml-2">
          CurrencyApp
        </span>
      </RouterLink>

      <nav class="hidden md:flex space-x-6 ">
        <RouterLink to="/" :class="[isActiveLink('/') ? 'bg-blue-900' : 'hover:bg-blue-800', 'block', 'px-3', 'py-2', 'rounded-sm']">Главная</RouterLink>
        <RouterLink to="/about-us" :class="[isActiveLink('/about-us') ? 'bg-blue-900' : 'hover:bg-blue-800', 'block', 'px-3', 'py-2', 'rounded-sm']">О нас</RouterLink>
        <RouterLink to="/contacts" :class="[isActiveLink('/contacts') ? 'bg-blue-900' : 'hover:bg-blue-800', 'block', 'px-3', 'py-2', 'rounded-sm']">Контакты</RouterLink>
      </nav>

      <button @click="isOpen = !isOpen" class="md:hidden focus:outline-none cursor-pointer">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7">
          </path>
        </svg>
      </button>
    </div>

    <div v-if="isOpen" class="md:hidden bg-blue-700">
      <RouterLink to="/" :class="[isActiveLink('/') ? 'bg-blue-900' : 'hover:bg-blue-800', 'block', 'px-3', 'py-2', 'rounded-sm']">Главная</RouterLink>
      <RouterLink to="/about-us" :class="[isActiveLink('/about-us') ? 'bg-blue-900' : 'hover:bg-blue-800', 'block', 'px-3', 'py-2', 'rounded-sm']">О нас</RouterLink>
      <RouterLink to="/contacts" :class="[isActiveLink('/contacts') ? 'bg-blue-900' : 'hover:bg-blue-800', 'block', 'px-3', 'py-2', 'rounded-sm']">Контакты</RouterLink>
    </div>
  </header>
</template>

<style scoped>
</style>
