<template>
  <ion-card v-if="weather && weather.main && weather.weather && weather.coord">
    <ion-card-header>
      <ion-card-title>{{ weather.name }}</ion-card-title>
      <ion-card-subtitle>{{ new Date().toLocaleDateString() }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <p>Temperatura: {{ weather.main.temp }} °C</p>
            <p>Condiciones: {{ weather.weather[0].description }}</p>
            <p>Humedad: {{ weather.main.humidity }}%</p>
            <p>Presión: {{ weather.main.pressure }} hPa</p>
            <p>Visibilidad: {{ weather.visibility / 1000 }} km</p>
            <p>Velocidad del viento: {{ weather.wind.speed }} m/s</p>
            <p>Dirección del viento: {{ weather.wind.deg }}°</p>
            <p>Amanecer: {{ formatTime(weather.sys.sunrise) }}</p>
            <p>Atardecer: {{ formatTime(weather.sys.sunset) }}</p>
            <p>Coordenadas: [{{ weather.coord.lat }}, {{ weather.coord.lon }}]</p>
          </ion-col>
        </ion-row>
      </ion-grid>
      <go-back-button />
      <ion-button @click="goToHourlyForecast"color="primary">Pronóstico por hora</ion-button>
    </ion-card-content>
  </ion-card>
  <ion-card v-else-if="loading">
    <ion-card-content>
      <ion-spinner name="crescent"></ion-spinner>
      <p>Cargando los detalles...</p>
    </ion-card-content>
  </ion-card>
  <ion-card v-else>
    <ion-card-content>
      <p>Error al cargar los detalles del clima. Por favor, inténtalo de nuevo.</p>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getWeatherDetails } from '@/services/index';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonSpinner, IonCardSubtitle } from '@ionic/vue';
import GoBackButton from './goBackButton.vue';

export default defineComponent({
  name: 'WeatherDetails',
  components: {
    IonCard,
    IonCardContent,
    IonButton,
    IonCardHeader,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonSpinner,
    IonCardSubtitle,
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
      loading: false,
    };
  },
  methods: {
    async fetchWeatherDetails() {
      this.loading = true;
      try {
        this.weather = await getWeatherDetails(this.city);
      } catch (error) {
        console.error('Error fetching weather details:', error);
      } finally {
        this.loading = false;
      }
    },
    goToHourlyForecast() {
      this.$router.push({ path: '/hourly-forecast', query: { city: this.city } });
    },
    formatTime(timestamp: number) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleTimeString();
    }
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
ion-card-title {
  font-size: 1.5em;
}
ion-card-subtitle {
  font-size: 1em;
  color: gray;
}
</style>
