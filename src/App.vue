<script setup>
// Importation CSS centralisée dans main.js (donc pas ici)
import './style.css';
</script>
<template>
  <div id="app-wrapper">
    <main class="container-fluid p-0 flex-fill">
      <router-view />
    </main>
  </div>
</template>

<style>
/* Structure principale avec Flexbox pour fixer le footer en bas */
#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Si tu veux que le fond s'applique à tout le body */
:global(body) {
  background-color: var(--background-one);
  color: var(--text-one);
  margin: 0;
  font-family: sans-serif;
}

/* Correction du sélecteur : container-fluid au lieu de container */
main.container-fluid {
  flex: 1;
}
</style>
