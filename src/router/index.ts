import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import WeatherPage from '../views/WeatherPage.vue';
import HourlyForecastPage from '../views/HourlyForecastPage.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/weather',
    name: 'Weather',
    component: WeatherPage,
  },
  {
    path: '/hourly-forecast',
    name: 'HourlyForecast',
    component: HourlyForecastPage,
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
