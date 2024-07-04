<template>
  <ion-card class="city-input-card">
    <ion-card-content>
      <ion-item>
        <ion-input v-model="cityName" placeholder="Ingrese el nombre de la ciudad"></ion-input>
      </ion-item>
      <ion-button @click="searchCity">Buscar</ion-button>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { IonCard, IonCardContent, IonItem, IonInput, IonButton } from '@ionic/vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'CityInput',
  components: {
    IonCard,
    IonCardContent,
    IonItem,
    IonInput,
    IonButton
  },
  data() {
    return {
      cityName: '',
    };
  },
  methods: {
    searchCity() {
      if (this.cityName.trim() !== '') {
        this.$emit('city-selected', this.cityName);
      } else {
        alert('Por favor, ingrese el nombre de una ciudad.');
      }
    },
    clearCity() {
      this.cityName = '';
    }
  },
  mounted() {
    const route = useRoute();
    watch(() => route.path, () => {
      this.clearCity();
    });
  }
});
</script>

<style scoped>
.city-input-card {
  margin: 16px;
  padding: 32px;
  background: rgba(128, 128, 128, 0.7); /* Gray color with opacity */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  width: calc(100% - 32px); /* Ensure it fits within the margin */
  max-width: 600px; /* Optional max-width for better appearance on larger screens */
}

ion-item {
  --background: rgba(255, 255, 255, 0.8); /* Slightly transparent white background */
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 8px;
}

ion-input {
  width: 100%;
  --placeholder-color: black; /* Make the placeholder text color black */
  --color: black; /* Ensure that input text color is also black */
}
</style>

