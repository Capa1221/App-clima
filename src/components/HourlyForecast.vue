<template>
  <ion-card class="transparent-card">
    <ion-card-header>
      <ion-card-title class="page-title">Pronóstico por hora para {{ cityName }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-grid>
        <!-- Contenido del pronóstico por hora -->
        <ion-row v-if="forecast" v-for="item in forecast.list" :key="item.dt" class="hour-card">
          <ion-col size="3">
            <ion-label class="info-label">Hora</ion-label>
            <br>
            {{ formatTime(item.dt) }}
          </ion-col>
          <ion-col size="3">
            <ion-label class="info-label">Temperatura</ion-label>
            <br>
            {{ item.main.temp }} °C
          </ion-col>
          <ion-col size="3">
            <ion-label class="info-label">Descripción</ion-label>
            <br>
            {{ item.weather[0].description }}
          </ion-col>
          <ion-col size="3">
            <ion-label class="info-label">Estado</ion-label>
            <br>
            <img :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`" :alt="item.weather[0].description" class="weather-icon"/>
          </ion-col>
        </ion-row>
        <!-- Mensaje de carga -->
        <ion-row v-else-if="loading" class="hour-card">
          <ion-col size="12">
            <ion-spinner name="crescent"></ion-spinner>
            <p>Cargando pronóstico...</p>
          </ion-col>
        </ion-row>
        <!-- Mensaje de error -->
        <ion-row v-else class="hour-card">
          <ion-col size="12">
            <p>Error al cargar los detalles del pronóstico. Por favor, inténtalo de nuevo.</p>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { getHourlyForecast } from '@/services/index';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonSpinner, IonLabel } from '@ionic/vue';

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
    IonLabel,
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
.transparent-card {
  background-color: transparent; /* Fondo transparente */
  box-shadow: none; /* Sin sombra */
  margin-bottom: 20px; /* Espacio entre tarjetas */
  position: relative; /* Posición relativa para permitir superposición */
  overflow: hidden; /* Ocultar el desbordamiento */
}

.page-title {
  font-size: 1.5rem; /* Tamaño del título */
  font-weight: bold; /* Texto en negrita */
  text-align: center; /* Alineación centrada */
  margin-bottom: 10px; /* Espacio inferior */
}

.hour-card {
  border-bottom: 1px solid #ccc; /* Borde inferior */
  padding: 10px 0; /* Espaciado interno */
}

.weather-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%; /* Borde redondeado para los iconos */
}

.info-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

ion-card-content {
  padding: 16px;
}

.info-label {
  font-weight: bold; /* Texto en negrita para etiquetas */
  margin-bottom: 5px; /* Espacio inferior */
}

</style>
