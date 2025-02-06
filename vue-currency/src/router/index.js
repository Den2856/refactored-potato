import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CurrenciesView from "@/views/CurrenciesView.vue";
import ConvertorView from "@/views/ConvertorView.vue";
import AnalyticsView from "@/views/AnalyticsView.vue";
import CurrencyView from "@/views/CurrencyView.vue";
import AboutUsView from "@/views/AboutUsView.vue";
import ContactsView from "@/views/ContactsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";


const router =  createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/currencies',
        name: 'currencies',
        component: CurrenciesView
      },
      {
        path: '/converter',
        name: 'convertor',
        component: ConvertorView
      },
      {
        path: '/analytics',
        name: 'analytics',
        component: AnalyticsView
      },
      {
        path: '/currencies/:id',
        name: 'currency',
        component: CurrencyView
      },
      {
        path: '/about-us',
        name: 'about-us',
        component: AboutUsView
      },
      {
        path: '/contacts',
        name: 'contacts',
        component: ContactsView
      },
      {
        path: '/:catchAll(.*)',
        name: 'not-found',
        component: NotFoundView
      },
    ]
});

export default router;