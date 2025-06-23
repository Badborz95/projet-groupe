<template>
  <div class="container mt-4">
    <h2>Jeux disponibles</h2>
    <div v-if="loading">Chargement...</div>
    <ul v-else class="list-group">
      <li v-for="jeu in jeux" :key="jeu.id" class="list-group-item">
        {{ jeu.title }} – {{ jeu.price }} €
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchGames } from '../services/gameService';

const jeux = ref([]);
const loading = ref(true);

onMounted(async () => {
  jeux.value = await fetchGames();
  loading.value = false;
});
</script>
