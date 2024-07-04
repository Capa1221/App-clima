<template>
  <ion-card v-if="weather && weather.main && weather.weather && weather.coord">
    <ion-card-header>
      <ion-card-title>{{ weather.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>Temperatura: {{ weather.main.temp }} °C</p>
      <p>Condiciones: {{ weather.weather[0].description }}</p>
      <p>Humedad: {{ weather.main.humidity }}%</p>
      <p>Coordenadas: [{{ weather.coord.lat }}, {{ weather.coord.lon }}]</p>
      <go-back-button />
      <ion-button @click="goToHourlyForecast">Pronóstico por hora</ion-button>
    </ion-card-content>
  </ion-card>
  <ion-card v-else>
    <ion-card-content>
      <p>Cargando los detalles...</p>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { getWeatherDetails } from '@/services/index';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/vue';
import GoBackButton from './goBackButton.vue';

export default defineComponent({
  name: 'WeatherDetails',
  components: {
    IonCard,
    IonCardContent,
    IonButton,
    IonCardHeader,
    IonCardTitle,
    GoBackButton,
  },
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      weather: null,
    };
  },
  methods: {
    async fetchWeatherDetails() {
      try {
        this.weather = await getWeatherDetails(this.city);
      } catch (error) {
        console.error('Error fetching weather details:', error);
      }
    },
    goToHourlyForecast() {
      this.$router.push({ path: '/hourly-forecast', query: { city: this.city } });
    },
  },
  watch: {
    city: {
      immediate: true,
      handler(newCity) {
        if (newCity) {
          this.fetchWeatherDetails();
        }
      },
    },
  },
});
</script>

<style scoped>
</style>