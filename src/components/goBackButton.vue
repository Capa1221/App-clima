<template>
    <ion-button @click="goBack">Ir a inicio</ion-button>
</template>
  
<script lang="ts">
  import { defineComponent } from 'vue';
  import { IonButton } from '@ionic/vue';
  
  export default defineComponent({
    name: 'GoBackButton',
    components: {
      IonButton,
    },
    methods: {
      goBack() {
        this.$router.push('/home');
      },
    },
  });
</script>
  
<style scoped>
</style>
  