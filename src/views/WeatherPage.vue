<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="ion-align-items-center">
        <ion-title class="custom-title">Detalles del clima</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <weather-details :city="city" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import WeatherDetails from '../components/WeatherDetails.vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

export default defineComponent({
  name: 'WeatherPage',
  components: {
    WeatherDetails,
    IonPage,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonContent,
  },
  data() {
    return {
      city: this.$route.query.city || '',
    };
  },
  watch: {
    '$route.query.city': {
      immediate: true,
      handler(newCity) {
        this.city = newCity || '';
      },
    },
  },
  methods: {
    clearCity() {
      this.city = '';
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === '/home') {
      this.clearCity();
    }
    next();
  },
});
</script>

<style scoped>
.custom-title {
  font-weight: bold;
  font-size: 2.5rem;
  font-family: 'Times New Roman';
  color: white; /* Asegúrate de que el color del texto sea blanco si es necesario */
  text-align: center; /* Centrar el texto */
}

/* Estilos adicionales para centrar */
.ion-align-items-center {
  justify-content: center !important; /* Centra horizontalmente */
}
</style>

