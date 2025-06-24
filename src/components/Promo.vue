<template>
  <div class="container-fluid py-2">
    <h2 class="font-weight-light">Les jeux de la semaine</h2>
    <div>
      <ul class="media-scroller snaps-inline">
        <li v-for="game in games" :key="game.id">
          <div class="game-card">
            <a :href="game.link"><img :src="`/assets/img/preview/${game.image}`" :alt="game.titre" /></a>
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

import { ref, onMounted } from 'vue';
import { collection, getDocs, query, where } from 'firebase/firestore'; 
import { db } from '../firebase/index.js'; 

const games = ref([]);

// Liste des IDs des jeux à afficher
const selectedIds = ['kn9pH1dkwMBBF3YOvmvN', 'sTIYDzvGIubJuR7DOIaD', 'NUSTlf7nbt76DKvcEFmv']; // Remplace par tes vrais IDs

const fetchAllGames = async () => {
  const gamesRef = collection(db, 'games');
  const gamesQuery = query(gamesRef, where('__name__', 'in', selectedIds));

  try {
    const querySnapshot = await getDocs(gamesQuery);
    games.value = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      games.value.push({
        id: doc.id,
        titre: data.name,
        link: data.link,
        image: data.image,
        price: `${data.price}€`,
      });
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des jeux :', error);
  }
};

onMounted(() => {
  fetchAllGames();
});

console.log('Résultat Firestore:', games.value);
</script>


<style scoped>

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
  font-size: 1.3em
}

.game-card .game-text {
  display: flex;
  justify-content: space-between;
}


.media-scroller {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 25%;
  gap: 150px;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-inline: contain;
  scrollbar-color: var(--interactive-comp-two) var(--interactive-comp-one);
}

.snaps-inline {
  scroll-snap-type: inline mandatory;
  scroll-padding-inline: 0px;
}

.snaps-inline>* {
  scroll-snap-align: start;
}

@media (min-width: 1200px) {
  .game-card {
    width: 350px;
    height: 275px;
  }

  .media-scroller {
    gap: 120px;
    justify-content: center;

  }
}
</style>