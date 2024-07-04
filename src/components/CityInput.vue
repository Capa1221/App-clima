<template>
  <ion-card>
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
</style>
