<template>
  <div class="container-fluid ">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8 p-0 w-100 ">
        <div class="carousel-container mx-auto" :style="{
          '--carousel-bg': `url('${imageHero[currentIndex].src}')`
        }">
          <div class="slider-wrapper">
            <!-- Slide précédente -->
            <div :class="['slide', 'prev']" @click="handleSlideClick(0)">
              <img :src="smallSlides[0].src" :alt="smallSlides[0].alt" class="img-fluid rounded-4 w-50" />
            </div>

            <!-- Slides centrale et latérales -->
            <div v-for="(slide, i) in visibleSlides" :key="i" :class="[
              'slide',
              i === 0 ? 'prev' : i === 1 ? 'active' : 'next',
              i === 1 && isFading ? 'fading' : ''
            ]" :style="slideStyle(i)" @click="handleSlideClick(i)">
              <template v-if="i === 1">
                <a :href="gameLink[currentIndex].src" target="_blank">
                  <img :src="slide.src" :alt="slide.alt" class="img-fluid rounded-4" style="cursor:pointer;" />
                </a>
              </template>
              <template v-else>
                <img :src="slide.src" :alt="slide.alt" class="img-fluid rounded-4" />
              </template>
            </div>

            <!-- Slide suivante -->
            <div :class="['slide', 'next']" @click="handleSlideClick(2)">
              <img :src="smallSlides[1].src" :alt="smallSlides[1].alt" class="img-fluid rounded-4 w-50 " />
            </div>
          </div>
          <div class="controls d-flex justify-content-between mt-3">
            <button class="btn" @click="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button class="btn" @click="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
          <div class="game-info mt-3">
            <h2>{{ gameInfo[currentIndex].name }}</h2>
            <p>{{ gameInfo[currentIndex].description }}</p>
            <p>{{ gameInfo[currentIndex].price }}</p>
            <a class="btn btn-page me-2">Acheter</a>
            <a :href="gameLink[currentIndex].src" target="_blank" class="btn btn-page me-2">Page du jeu</a>
            <a class="btn btn-danger " @click="changeFavoriteImage(currentIndex)"><img
                :src="favorites[currentIndex] ? '/assets/img/favorite_black.png' : '/assets/img/favorite_empty.png'"
                alt="Icône" style="width: 24px; height: 24px;" /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { collection, getDocs, query, where } from 'firebase/firestore'; 
import { db } from '../firebase/index.js'; 

const games = ref([]);

// Liste des IDs des jeux à afficher
const selectedIds = ['tEZ8WKToNXRdUw30WBpN', 'ouRWQoFisMSRMbu5RncX', 'HT3qJHVa9pXQJZSXRkQR', 'HuvvEF5GQmSZ7ylXW1zW', 'ZuL3BlFzp83IyXuTQ4DF'];

//Importation des images
const imagesPrevu = ref([
  { src: '/assets/img/icon/gtavi.png', alt: 'Image 1' },
  { src: '/assets/img/icon/metaphor.png', alt: 'Image 2' },
  { src: '/assets/img/icon/nightrein.png', alt: 'Image 3' },
  { src: '/assets/img/icon/TLOU2.jpg', alt: 'Image 4' },
  { src: '/assets/img/icon/Clair_Obscur.jpg', alt: 'Image 5' }
]);

// Liens des jeux
const gameLink = ref([
  { src: 'https://www.instant-gaming.com/fr/2462-acheter-grand-theft-auto-vi-pc-jeu-rockstar/', alt: 'Page GTA VI' },
  { src: 'https://www.instant-gaming.com/fr/14352-acheter-metaphor-refantazio-pc-jeu-steam-europe/', alt: 'Page Metaphor' },
  { src: 'https://www.instant-gaming.com/fr/18294-acheter-elden-ring-nightreign-pc-jeu-steam-europe/', alt: 'Page Elden Ring Nightrein' },
  { src: 'https://www.instant-gaming.com/fr/6215-acheter-the-last-of-us-part-ii-remastered-pc-jeu-steam-europe/', alt: 'Page The Last of Us 2' },
  { src: 'https://www.instant-gaming.com/fr/17015-acheter-clair-obscur-expedition-33-pc-jeu-steam-europe-us-canada/', alt: 'Page Clair Obscur' }

]);

// Images pour background carrousel
const imageHero = [
  { src: 'https://cdn2.steamgriddb.com/hero_thumb/b80be7960918982fceea91afaf4d5e27.jpg', alt: 'Image Hero GTA VI' },
  { src: 'https://cdn2.steamgriddb.com/hero_thumb/aaecbb83e18bf24199bc5b2d3a280054.jpg', alt: 'Image Hero Metaphor' },
  { src: 'https://cdn2.steamgriddb.com/hero_thumb/8ec28b09ec95f08279e82459f1289c34.jpg', alt: 'Image Hero Nightrein' },
  { src: 'https://cdn2.steamgriddb.com/hero_thumb/5b465c13fd8cac3b9baf4af74bc0069a.png', alt: 'Image Hero TLOU2' },
  { src: 'https://cdn2.steamgriddb.com/hero_thumb/d2d195657240f493374e95e2b75cc8cf.jpg', alt: 'Image Hero Clair Obscur' }
];


// Informations sur les jeux
const gameInfo = ref([
  { name: 'Grand Thief Auto VI', description: 'lorem ipsum', price: '59.99€', },
  { name: 'Metaphor: ReFantazio', description: 'lorem ipsum', price: '49.99€', },
  { name: 'Elden Ring Nightrein', description: 'lorem ipsum', price: '39.99€', },
  { name: 'The Last of Us Part II REMASTERED', description: 'lorem ipsum', price: '29.99€', },
  { name: 'Clair Obscur : Expédition 33', description: 'lorem ipsum', price: '19.99€', }
]);

const currentIndex = ref(0);
const isFading = ref(false); 
const favorites = ref([false, false, false, false, false]); // Tableau pour les favoris

const prevIndex = computed(() => (currentIndex.value - 1 + imagesPrevu.value.length) % imagesPrevu.value.length); // Index de l'image précédente
const nextIndex = computed(() => (currentIndex.value + 1) % imagesPrevu.value.length); // Index de l'image suivante

// Fonction pour obtenir les images visibles
const visibleSlides = computed(() => {
  const len = imagesPrevu.value.length;
  return [
    imagesPrevu.value[(currentIndex.value - 1 + len) % len], // slide de gauche (précédente)
    imagesPrevu.value[currentIndex.value],                    // slide centrale (active)
    imagesPrevu.value[(currentIndex.value + 1) % len]         // slide de droite (suivante)
  ];
});

// Fonction pour obtenir les petites images latérales
const smallSlides = computed(() => {
  const len = imagesPrevu.value.length;
  return [
    imagesPrevu.value[(currentIndex.value - 2 + len) % len], // slide latérale gauche
    imagesPrevu.value[(currentIndex.value + 2) % len]          // slide latérale droite
  ];
});

const slideStyle = (i) => {
  if (i === 1) { // slide active
    return { width: '50%' };
  } else {       // slide latérale
    return { width: '25%' };
  }
};

let autoSlideInterval = null;

function resetAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    next();
  }, 6000);
}

onMounted(() => { 
  resetAutoSlide();
});

onUnmounted(() => {
  clearInterval(autoSlideInterval);
});

// Fonctions de navigation
const next = () => {
  isFading.value = true;
  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % imagesPrevu.value.length;
    isFading.value = false;
    resetAutoSlide(); // reset timer
  }, 500);
};

const prev = () => {
  isFading.value = true;
  setTimeout(() => { // Simule un délai pour l'effet de fondu
    currentIndex.value = (currentIndex.value - 1 + imagesPrevu.value.length) % imagesPrevu.value.length;
    isFading.value = false;
    resetAutoSlide(); // reset timer
  }, 500);
};

// Fonction pour gérer le clic sur les slides
const handleSlideClick = (i) => {
  if (i === 0) prev();
  if (i === 2) next();
};

const changeFavoriteImage = (index) => {
  favorites.value[index] = !favorites.value[index];
};

</script>

<style scoped>
.carousel-container {
  width: 100%;
  max-width: 900px;
  min-height: 250px;
  overflow: hidden;
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-container::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: var(--carousel-bg);
  background-size: cover;
  background-position: center;
  filter: blur(5px);
  opacity: 0.7;
  transition: background-image 0.4s;
  pointer-events: none;
}


.slider-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 200px;
}

.slide {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s, transform 0.5s, filter 0.5s;
  opacity: 0.5;
  filter: blur(0.5px);
  width: 25%;
  z-index: 1;
  
  
}

.slide.active {
  opacity: 1;
  transition: opacity 0.4s;
  filter: none;
  transform: scale(1) rotate(0deg);
  width: 50%;
  z-index: 2;
  transition:
    transform 0.5s cubic-bezier(0.10, 1, 0.36, 1),
    cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.5s;
    

}


.slide.active :hover {
  cursor: pointer;
  transform: scale(1.05) rotate(-2deg);
  transition:
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.5s;
}

.slide.prev,
.slide.next {
  opacity: 0.5;
  filter: blur(1px);
  transform: scale(0.8);
  width: 25%;
  z-index: 1;
}


.controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-150%);
  z-index: 3;
}

.controls span {
  background-color: #00000079;
  border-radius: 30%;
}

.btn-page {
  background-color: var(--solid-one);
  color: var(--text-high-contrast);
  text-decoration: none;
  border: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.slide.active.fading {
  opacity: 0;
  transition: opacity 0.5s;
}

.slide.active {
  opacity: 1;
  transition: opacity 0.5s;
}

.game-info {
  width: 100%;
  max-width: 300px;
  max-height: 250px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 20px;
  justify-content: center;
  text-align: center;
  color: var(--text-high-contrast);
  background-color: #7b7b7b65;
  border: #00000079 solid 1px;
  z-index: 2;
  border-radius: 12px;
  padding: 15px;
}


@media (min-width: 1200px) {
  .carousel-container {
    max-width: 100%;
    min-height: 400px;
  }

  .slide img {
    margin-top: 50px;
  }

  .controls {
    position: absolute;
    top: 80% !important;
    left: 30% !important;
    right: 30% !important;
    display: flex;
    justify-content: space-between;
    z-index: 3;
  }


  .game-info {
    width: 100%;
    max-width: 400px !important;
    margin-right: auto;
    margin-left: 40px !important;
    margin-bottom: 10px;
    text-align: left !important;
    border-radius: 12px;
    padding: 16px;
  }

  .game-info h2,
  .game-info p {
    text-align: left;
  }
}
</style>
