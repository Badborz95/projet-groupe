<template>
  <!--<div class="container">
    <ul>
      <h2>Promo Games:</h2>
      <li v-for="game in games" :key="game.id">
        <div class="game">
          <h3>Titre: {{ game.titre }}</h3> |
          <p>Résumé: {{ game.contenu }}</p> |
        </div>
      </li>
    </ul>
  </div>-->


  <div class="container-fluid py-2">
    <h2 class="font-weight-light">Promo Games</h2>
    <div>
      <ul class="media-scroller snaps-inline">
        <li v-for="game in games" :key="game.id">
          <div class="game-card">
            <!--<img :src="game.image" :alt="game.titre" />-->
            <a :href="game.link"><img :src="game.image" :alt="game.titre" /></a>
            <div class="game-text">
              <h3 class="titre">{{ game.titre }} :</h3>
              <h3 class="prix">{{ game.price }}</h3>
            </div>
            <h2></h2>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import '../style.css';
const games = ref([
  {
    id: 1,
    titre: 'GTA6',
    link: 'https://www.instant-gaming.com/en/?utm_source=google&utm_medium=cpc&utm_campaign=1946835326&utm_content=70498383293&utm_term=instant-gaming&gad_source=1&gad_campaignid=1946835326&gbraid=0AAAAADNzuvUzP5sO622yfpIX7-Pv62d5-&gclid=CjwKCAjwz_bABhAGEiwAm-P8YSiMjwE8PZKO-6mksYNGofakinXgjnExR-kfiqR9vSXm7lq3mKYWDRoCsXgQAvD_BwE',
    image: '/assets/img/gtavi.png',
    price: '30€'
  },
  {
    id: 2,
    titre: 'Metaphor : re fantazio',
    link: 'https://www.instant-gaming.com/en/?utm_source=google&utm_medium=cpc&utm_campaign=1946835326&utm_content=70498383293&utm_term=instant-gaming&gad_source=1&gad_campaignid=1946835326&gbraid=0AAAAADNzuvUzP5sO622yfpIX7-Pv62d5-&gclid=CjwKCAjwz_bABhAGEiwAm-P8YSiMjwE8PZKO-6mksYNGofakinXgjnExR-kfiqR9vSXm7lq3mKYWDRoCsXgQAvD_BwE',
    image: '/assets/img/metaphor.png',
    price: '30€'
  },
  {
    id: 3,
    titre: 'Elden ring : Nightrein',
    link: 'https://www.instant-gaming.com/en/?utm_source=google&utm_medium=cpc&utm_campaign=1946835326&utm_content=70498383293&utm_term=instant-gaming&gad_source=1&gad_campaignid=1946835326&gbraid=0AAAAADNzuvUzP5sO622yfpIX7-Pv62d5-&gclid=CjwKCAjwz_bABhAGEiwAm-P8YSiMjwE8PZKO-6mksYNGofakinXgjnExR-kfiqR9vSXm7lq3mKYWDRoCsXgQAvD_BwE',
    image: '/assets/img/nightrein.png',
    price: '30€'
  },
  {
    id: 4,
    titre: 'The Last of us : Part 2 Remastered',
    link: 'https://www.instant-gaming.com/en/?utm_source=google&utm_medium=cpc&utm_campaign=1946835326&utm_content=70498383293&utm_term=instant-gaming&gad_source=1&gad_campaignid=1946835326&gbraid=0AAAAADNzuvUzP5sO622yfpIX7-Pv62d5-&gclid=CjwKCAjwz_bABhAGEiwAm-P8YSiMjwE8PZKO-6mksYNGofakinXgjnExR-kfiqR9vSXm7lq3mKYWDRoCsXgQAvD_BwE',
    image: '/assets/img/TLOU2.jpg',
    price: '30€'
  },
  {
    id: 5,
    titre: 'Clair Obscur : Expedition 33',
    link: 'https://www.instant-gaming.com/en/?utm_source=google&utm_medium=cpc&utm_campaign=1946835326&utm_content=70498383293&utm_term=instant-gaming&gad_source=1&gad_campaignid=1946835326&gbraid=0AAAAADNzuvUzP5sO622yfpIX7-Pv62d5-&gclid=CjwKCAjwz_bABhAGEiwAm-P8YSiMjwE8PZKO-6mksYNGofakinXgjnExR-kfiqR9vSXm7lq3mKYWDRoCsXgQAvD_BwE',
    image: '/assets/img/Clair_Obscur.jpg',
    price: '30€'
  },
  {
    id: 6,
    titre: 'GTA6',
    link: 'https://www.instant-gaming.com/en/?utm_source=google&utm_medium=cpc&utm_campaign=1946835326&utm_content=70498383293&utm_term=instant-gaming&gad_source=1&gad_campaignid=1946835326&gbraid=0AAAAADNzuvUzP5sO622yfpIX7-Pv62d5-&gclid=CjwKCAjwz_bABhAGEiwAm-P8YSiMjwE8PZKO-6mksYNGofakinXgjnExR-kfiqR9vSXm7lq3mKYWDRoCsXgQAvD_BwE',
    image: '',
    price: '30€'
  },
])
/*const props = defineProps({
  games: {
    type: Array,
    default: []
  }
})*/

</script>


<style>

ul {
  list-style: none;
  display: flex;
  flex-direction: row;
}

a {
  text-decoration: none;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game-card {
  width: 200px;
  height: 150px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.game-card img {
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: grid;
  gap: 20px;
  grid-template-rows: min-content;
  border-radius: 5%;

}

.game-card h3 {
  margin-left: 10px;
  margin-top: 5px;
  font-size: 1.5em
}

.game-card .game-text {
  display: flex;
  justify-content: space-between;
}


.media-scroller {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 25%;
  gap: 100px;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-inline: contain;
  scrollbar-color: var(--interactive-comp-two) var(--interactive-comp-one);
}

.snaps-inline {
  scroll-snap-type: inline mandatory;
  scroll-padding-inline: 30px;
}

.snaps-inline>* {
  scroll-snap-align: start;
}

@media (min-width: 1250px) {
  .game-card {
    width: 350px;
    height: 275px;
  }

  .media-scroller {
    grid-auto-columns: 13%;
    gap: 200px;



  }
}
</style>