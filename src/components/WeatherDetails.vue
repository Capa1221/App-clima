<template>
  <ion-card v-if="weather && weather.main && weather.weather && weather.coord" class="weather-details">
    <ion-card-header>
      <ion-card-title class="custom-title">{{ weather.name }}</ion-card-title>
      <ion-card-subtitle class="custom-subtitle">{{ new Date().toLocaleDateString() }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content class="weather-content">
      <div class="weather-details-grid">
        <div class="weather-detail">
          <p class="detail-label">Temperatura:</p>
          <p class="detail-value">{{ weather.main.temp }} °C</p>
        </div>
        <div class="weather-detail">
          <p class="detail-label">Condiciones:</p>
          <p class="detail-value">{{ weather.weather[0].description }}</p>
        </div>
        <div class="weather-detail">
          <p class="detail-label">Humedad:</p>
          <p class="detail-value">{{ weather.main.humidity }}%</p>
        </div>
        <div class="weather-detail">
          <p class="detail-label">Presión:</p>
          <p class="detail-value">{{ weather.main.pressure }} hPa</p>
        </div>
        <div class="weather-detail">
          <p class="detail-label">Visibilidad:</p>
          <p class="detail-value">{{ weather.visibility / 1000 }} km</p>
        </div>
        <div class="weather-detail">
          <p class="detail-label">Velocidad del viento:</p>
          <p class="detail-value">{{ weather.wind.speed }} m/s</p>
        </div>
        <div class="weather-detail">
          <p class="detail-label">Dirección del viento:</p>
          <p class="detail-value">{{ weather.wind.deg }}°</p>
        </div>
        <div class="weather-detail">
          <p class="detail-label">Amanecer:</p>
          <p class="detail-value">{{ formatTime(weather.sys.sunrise) }}</p>
        </div>
        <div class="weather-detail">
          <p class="detail-label">Atardecer:</p>
          <p class="detail-value">{{ formatTime(weather.sys.sunset) }}</p>
        </div>
        <div class="weather-detail">
          <p class="detail-label">Coordenadas:</p>
          <p class="detail-value">[{{ weather.coord.lat }}, {{ weather.coord.lon }}]</p>
        </div>
      </div>
      <div class="weather-buttons">
        <go-back-button />
        <ion-button @click="goToHourlyForecast" color="primary">Pronóstico por hora</ion-button>
      </div>
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
.weather-details {
  background-image: url('https://st4.depositphotos.com/17054972/19881/v/450/depositphotos_198812272-stock-illustration-rainy-sky-background-cartoon-style.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  color: white; 
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-height: 100vh; /* Ajuste para que ocupe al menos el alto completo */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  opacity: 0.9; /* Opacidad ajustada */
}

.weather-content {
  width: 100%;
  max-width: 600px; /* Ancho máximo para contenido */
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 20px; 
}

.weather-details-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
  gap: 10px; 
}

.weather-detail {
  background-color: rgba(0, 0, 0, 0.5); 
  padding: 10px;
  border-radius: 5px;
  text-align: center; 
}

.detail-label {
  font-weight: bold;
  color: white; 
  margin-bottom: 5px;
}

.detail-value {
  color: white; 
}

.weather-buttons {
  width: 100%;
  display: flex;
  justify-content: space-around; 
  margin-top: 20px; 
}

.custom-title {
  font-weight: bold;
  font-size: 2rem; /* Tamaño de fuente ajustado */
  font-family: 'Roboto', sans-serif; /* Familia de fuente específica */
  color: white; 
  text-align: center; /* Alineación centrada */
}

.custom-subtitle {
  font-weight: bold;
  font-size: 1.2rem; /* Tamaño de fuente ajustado */
  font-family: 'Roboto', sans-serif; /* Familia de fuente específica */
  color: white; 
  text-align: center; /* Alineación centrada */
}

/* Estilos para hacer responsive */
@media (max-width: 600px) {
  .weather-details {
    padding: 10px; /* Reducción de padding en dispositivos pequeños */
  }
  
  .custom-title {
    font-size: 1.8rem; /* Tamaño de fuente reducido para dispositivos pequeños */
  }
  
  .custom-subtitle {
    font-size: 1rem; /* Tamaño de fuente reducido para dispositivos pequeños */
  }
}
</style>
