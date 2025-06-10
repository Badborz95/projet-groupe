<template>
  <div id="app-wrapper">
    <!-- La barre de navigation s'affichera sur toutes les pages -->
    <Navbar />

    <!-- La balise router-view affichera le composant de la page actuelle -->
    <main class="container my-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// Utilisation de <script setup> pour une syntaxe plus concise
import Navbar from './components/Navbar.vue'
</script>

<style>
/* Vous pouvez ajouter des styles globaux ici */
body {
  background-color: #f8f9fa; /* Un fond gris clair pour le corps de la page */
}

#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main.container {
  flex: 1;
}
</style>
