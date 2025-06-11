<template>
  <div class="carousel-container mx-auto mt-3">
    <!-- La zone glissante qui contient 3 slides -->
    <div class="slider-wrapper d-flex" 
         :style="{
           transform: `translateX(${translate}%)`,
           transition: animating ? `transform ${transitionDuration}ms ease` : 'none'
         }">
      <!-- Pour chaque slide visible, on affecte un style différent selon sa position -->
      <div v-for="(slide, i) in visibleSlides" 
           :key="i"
           :class="['slide', i === 1 ? 'active' : (i === 0 ? 'prev' : 'next')]"
           :style="slideStyle(i)"
           @click="handleSlideClick(i)">
        <img :src="slide.src" :alt="slide.alt" class="img-fluid rounded-4">
      </div>
    </div>
  </div>

  <!-- Boutons de navigation -->
  <div class="controls d-flex justify-content-between mt-3" style="max-width: 750px; margin:0 auto;">
    <button class="btn" @click="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    </button>
<a :href="gameLink[currentIndex].src" target="_blank" class="btn btn-primary btn-page">
  Page du jeu
</a>
    <button class="btn " @click="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
    </button>
  </div>
</template>

<script setup>
import '../style.css';
import { ref, computed } from 'vue';

const images = ref([
  { src: '/assets/img/gtavi.png', alt: 'Image 1' },
  { src: '/assets/img/metaphor.png', alt: 'Image 2' },
  { src: '/assets/img/nightrein.png', alt: 'Image 3' },
  { src: '/assets/img/TLOU2.jpg', alt: 'Image 4' },
  { src: '/assets/img/Clair_Obscur.jpg', alt: 'Image 5' }
]);

const gameLink = ref([
  { src: 'https://www.instant-gaming.com/fr/2462-acheter-grand-theft-auto-vi-pc-jeu-rockstar/', alt: 'Page GTA VI' },
  { src: 'https://www.instant-gaming.com/fr/14352-acheter-metaphor-refantazio-pc-jeu-steam-europe/', alt: 'Page Metaphor' },
  { src: 'https://www.instant-gaming.com/fr/18294-acheter-elden-ring-nightreign-pc-jeu-steam-europe/', alt: 'Page Elden Ring Nightrein' },
  { src: 'https://www.instant-gaming.com/fr/6215-acheter-the-last-of-us-part-ii-remastered-pc-jeu-steam-europe/', alt: 'Page The Last of Us 2' },
  { src: 'https://www.instant-gaming.com/fr/17015-acheter-clair-obscur-expedition-33-pc-jeu-steam-europe-us-canada/', alt: 'Page Clair Obscur' }

]);

const currentIndex = ref(0);
const transitionDuration = 500;
const translate = ref(0);
const animating = ref(false);

const prevIndex = computed(() => (currentIndex.value - 1 + images.value.length) % images.value.length);
const nextIndex = computed(() => (currentIndex.value + 1) % images.value.length);

const visibleSlides = computed(() => {
  const len = images.value.length;
  return [
    images.value[(currentIndex.value - 1 + len) % len], // slide de gauche (précédente)
    images.value[currentIndex.value],                  // slide centrale (active)
    images.value[(currentIndex.value + 1) % len]         // slide de droite (suivante)
  ];
});

const slideStyle = (i) => {
  if (i === 1) { // slide active
    return { width: '50%' };
  } else {       // slide latérale
    return { width: '25%' };
  }
};

// Fonctions de navigation
const next = () => {
  if (animating.value) return;
  animating.value = true;
  translate.value = -25;
  setTimeout(() => {
    currentIndex.value = nextIndex.value;
    translate.value = 0;
    animating.value = false;
  }, transitionDuration);
};

const prev = () => {
  if (animating.value) return;
  animating.value = true;
  translate.value = 25;
  setTimeout(() => {
    currentIndex.value = prevIndex.value;
    translate.value = 0;
    animating.value = false;
  }, transitionDuration);
};

const handleSlideClick = (i) => {
  if (i === 0) {
    prev();
  } else if (i === 2) {
    next();
  }
};
</script>

<style scoped>
.carousel-container {
  max-width: 750px;
  overflow: hidden;
  position: relative;
}

.slider-wrapper {
  display: flex;
  align-items: center;
}

.slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.active img {
  transform: scale(0.9);
  opacity: 1;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.prev img,
.next img {
  transform: scale(0.8);
  opacity: 0.5;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.carousel-control-next-icon {
  max-width: 20px;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='grey' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
}

.carousel-control-prev-icon {
  max-width: 20px;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='grey' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
}

.btn-page {
  background-color: var(--solid-one);
  color: var(--text-high-contrast);
  text-decoration: none;
  border: none;
}

</style>
