<template>
  <Navbar />
  <div class="container mt-5 pt-5">
    <RouterView />
  </div>
</template>

<script setup>
import Navbar from './views/Navbar.vue'
</script>
