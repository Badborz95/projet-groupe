<script setup>
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

</script>

<template>
  <div id="app-wrapper">
    <!-- La barre de navigation s'affichera sur toutes les pages -->
    <Navbar />

    <!-- La balise router-view affichera le composant de la page actuelle -->
    <main class="container-fluid p-0 ">
      <router-view />
    </main>
    <!-- Footer -->
     <Footer />
    <!-- Fin du Footer -->
  </div>
</template>

<style>
#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

body {
  background-color: var(--background-one);
  color: var(--text-one);
}

.navbar {
  background-color: var(--background-two);
   z-index: 1050;
}

main.container {
  flex: 1;
}
</style>
