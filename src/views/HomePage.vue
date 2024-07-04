<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>App del Clima</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-card class="city-card">
          <ion-card-content>
            <CityInput ref="cityInput" @city-selected="selectCity" />
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import CityInput from '../components/CityInput.vue';
  import { IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  
  export default defineComponent({
    name: 'HomePage',
    components: {
      CityInput,
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonCard,
      IonCardContent
    },
    methods: {
      selectCity(city: string) {
        if (city) {
          this.$router.push({ name: 'Weather', query: { city } });
        } else {
          alert("Por favor, ingrese el nombre de una ciudad.");
        }
      },
    },
    mounted() {
      this.$refs.cityInput.clearCity();
    },
  });
  </script>
  
  <style scoped>
  ion-header {
    --background: #3880ff; /* Ionic primary color */
    color: white;
    text-align: center;
  }
  
  ion-title {
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  .city-card {
    margin: 16px;
    padding: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  ion-card-content {
    display: flex;
    justify-content: center;
  }
  
  .city-card ion-card-content {
    padding: 0;
  }
  </style>
  