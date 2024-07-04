<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/" />
        </ion-buttons>
        <ion-title class="custom-title">Pronóstico por Hora</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="goBack" class="back-button">
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <hourly-forecast :city="city" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import HourlyForecast from '../components/HourlyForecast.vue';
import { IonPage, IonToolbar, IonHeader, IonTitle, IonButton, IonButtons, IonBackButton } from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'HourlyForecastPage',
  components: {
    HourlyForecast,
    IonPage,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonButton,
    IonButtons,
    IonBackButton,
  },
  data() {
    return {
      city: '',
    };
  },
  mounted() {
    const route = useRoute();
    watch(
      () => route.query.city,
      (newCity) => {
        this.city = newCity;
      },
      { immediate: true }
    );
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
});
</script>

<style scoped>
.back-button {
  margin-right: 10px; /* Espacio entre los botones */
}
.custom-title {
  font-weight: bold;
  font-size: 2rem; /* Tamaño de fuente ajustado */
  font-family: 'Times New Roman';
  color: white; 
  text-align: center; /* Alineación centrada */
}
</style>
