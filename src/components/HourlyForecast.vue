<template>
  <ion-card v-if="forecast">
    <ion-card-header>
      <ion-card-title>Pronóstico por hora para {{ cityName }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-grid>
        <ion-row v-for="item in forecast.list" :key="item.dt">
          <ion-col size="3">{{ formatTime(item.dt) }}</ion-col>
          <ion-col size="3">{{ item.main.temp }} °C</ion-col>
          <ion-col size="3">{{ item.weather[0].description }}</ion-col>
          <ion-col size="3">
            <img :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`" :alt="item.weather[0].description" class="weather-icon"/>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
  <ion-card v-else-if="loading">
    <ion-card-content>
      <ion-spinner name="crescent"></ion-spinner>
      <p>Cargando pronóstico...</p>
    </ion-card-content>
  </ion-card>
  <ion-card v-else>
    <ion-card-content>
      <p>Error al cargar los detalles del pronóstico. Por favor, inténtalo de nuevo.</p>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getHourlyForecast } from '@/services/index';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/vue';

export default defineComponent({
  name: 'HourlyForecast',
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonSpinner,
  },
  data() {
    return {
      city: this.$route.query.city || '',
      cityName: '', // Variable para almacenar el nombre de la ciudad buscada
      forecast: null,
      loading: true,
    };
  },
  methods: {
    async fetchHourlyForecast() {
      this.loading = true;
      try {
        // Obtener el pronóstico por hora para la ciudad
        this.forecast = await getHourlyForecast(this.city);
        // Establecer el nombre de la ciudad para mostrar en el título
        this.cityName = this.forecast.city.name;
      } catch (error) {
        console.error('Error fetching hourly forecast:', error);
      } finally {
        this.loading = false;
      }
    },
    formatTime(timestamp: number): string {
      return new Date(timestamp * 1000).toLocaleTimeString();
    },
  },
  created() {
    this.fetchHourlyForecast();
  },
});
</script>

<style scoped>
.weather-icon {
  width: 40px;
  height: 40px;
}
ion-card-content {
  padding: 16px;
}
ion-row {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
</style>
