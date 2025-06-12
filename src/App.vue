<template>
  <div id="app-wrapper">
    <!-- La barre de navigation s'affichera sur toutes les pages -->
    <Navbar />

    <!-- La balise router-view affichera le composant de la page actuelle -->
    <main class="container my-4">
      <router-view />
    </main>
    <!-- Le pied de page s'affichera sur toutes les pages -->
     <Footer />
  </div>
</template>
<script setup>
// Utilisation de <script setup> pour une syntaxe plus concise
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { db } from './firebase/index.js'
</script>

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
