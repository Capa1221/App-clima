<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="custom-title">App del Clima</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="background">
        <div class="clouds"></div>
        <div class="rain"></div>
      </div>
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
  --background: #3880ff; 
  color: white;
  text-align: center;
}

.custom-title {
  font-weight: bold;
  font-size: 2.5rem;
  font-family: 'Times New Roman'; 
}

.city-card {
  margin: 16px;
  padding: 32px;
  background: rgba(128, 128, 128, 0.7);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px; 
}

ion-card-content {
  display: flex;
  justify-content: center;
}

.city-card ion-card-content {
  padding: 0;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  pointer-events: none; 
  background: url('https://i.makeagif.com/media/8-11-2023/Xu_roP.gif') repeat-x;
  background-size: cover;
}

.clouds {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  animation: moveClouds 60s linear infinite;
}

@keyframes moveClouds {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>


  