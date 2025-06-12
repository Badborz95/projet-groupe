<script setup>
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Slider from './components/slider.vue';
import Defilement from './components/Defilement.vue';
</script>

<template>


  <Slider />
</template>

<style>
body {
  background-color: var(--background-one);
  color: var(--text-one);
}

.navbar {
  background-color: var(--background-two);
   z-index: 1050;
}

.navbar .nav-link,
.navbar .navbar-brand {
  color: var(--text-one) !important;
}
</style>
