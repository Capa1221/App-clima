<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Pronóstico por Hora</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <hourly-forecast :city="city" />
      <go-back-button />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import HourlyForecast from '../components/HourlyForecast.vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { useRoute } from 'vue-router';
import GoBackButton from '../components/goBackButton.vue';

export default defineComponent({
  name: 'HourlyForecastPage',
  components: {
    HourlyForecast,
    IonPage,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonContent,
    GoBackButton,
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
});
</script>

<style scoped>
</style>
