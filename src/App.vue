<script setup>
// Importation CSS centralisée dans main.js (donc pas ici)
import './style.css';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div id="app-wrapper">
    <Navbar />
    
    <main class="container-fluid p-0 flex-fill">
      <router-view />
    </main>
    
    <Footer />
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

/* Navbar fixe avec z-index */
.navbar {
  background-color: var(--background-two);
  z-index: 1050;
}

/* Correction du sélecteur : container-fluid au lieu de container */
main.container-fluid {
  flex: 1;
}
</style>
