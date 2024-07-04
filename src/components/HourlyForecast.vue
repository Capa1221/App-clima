<template>
  <ion-card v-if="forecast">
    <ion-card-header>
      <ion-card-title>Pronóstico por hora para {{ city }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div v-for="item in forecast.list" :key="item.dt">
        <p>{{ new Date(item.dt * 1000).toLocaleTimeString() }} - {{ item.main.temp }} °C - {{ item.weather[0].description }}</p>
      </div>
    </ion-card-content>
  </ion-card>
  <ion-card v-else>
    <ion-card-content>
      <p>Cargando pronóstico...</p>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getHourlyForecast } from '@/services/index';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/vue';

export default defineComponent({
  name: 'HourlyForecast',
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
  },
  data() {
    return {
      city: this.$route.query.city || '',
      forecast: null,
    };
  },
  methods: {
    async fetchHourlyForecast() {
      try {
        this.forecast = await getHourlyForecast(this.city);
      } catch (error) {
        console.error('Error fetching hourly forecast:', error);
      }
    },
  },
  created() {
    this.fetchHourlyForecast();
  },
});
</script>

<style scoped>
</style>