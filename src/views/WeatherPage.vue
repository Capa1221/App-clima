<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Detalles del clima</ion-title>
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
</style>
