<template>
  <div class="container-fluid py-2 preco">
    <h2 class="font-weight-light">Précommandes</h2>
    <div>
      <ul class="media-scroller snaps-inline" id='precoIn'>
        <li v-for="game in games" :key="game.id">
          <div class="game-card">
            <a :href="game.link"><img :src="`/assets/img/preview/${game.image}`" :alt="game.titre" /></a>
            <div class="game-text">
              <h3 class="titre">{{ game.titre }}</h3>
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
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'; 
import { db } from '../firebase/index.js'; 

const games = ref([]);

/*Fonction pour récupérer les jeux de la BDD Firebase*/
const fetchAllGames = async () => {
  const gamesRef = collection(db, 'games');
  
  //Obtention de la date d'aujourd'hui
  const today = new Date();
  // Mettre l'heure à 00:00:00.000 pour comparer avec le début de la journée.
  today.setHours(0, 0, 0, 0); 

  // Créer une requête pour récupérer les jeux dont la date de sortie est égale ou postérieure à aujourd'hui.
  //    - where('dateSortie', '>=', today) : Filtre par date de sortie future ou égale à aujourd'hui
  //    - orderBy('dateSortie') : Trie les résultats par date (nécessaire avec le filtre de plage)
  const gamesQuery = query(
    gamesRef,
    where('dateSortie', '>=', today), 
    orderBy('dateSortie'),              
    limit(8)                           
  );

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

// Exécute la fonction de récupération des jeux quand le composant est monté
onMounted(() => {
  fetchAllGames();
});
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

.preco {
  height: 260px;
  align-items: end;
  justify-content: end;
}

.game-card {
  width: 200px;
  height: 150px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  transition: all 1000ms;
  margin-bottom: 20px;
  margin-top: 20px;

}

.game-card:hover {
  transform: scale(1.1);

}

.game-card img {
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  object-fit: fill;
  display: grid;
  gap: 20px;
  grid-template-rows: min-content;
  border-radius: 5%;
}


.game-card img:hover {
  box-shadow: 4px 5px 17px -4px #268391;
}

.game-card h3 {
  margin-left: 10px;
  margin-top: 5px;
  font-size: 1.1em
}

.game-card .game-text {
  display: flex;
  justify-content: space-between;
}


#precoIn {
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
  scroll-padding-inline: 30px;
}

.snaps-inline>* {
  scroll-snap-align: start;
}

@media (min-width: 1250px) {
.preco{
  height: 800px;
}

#precoIn{
  overflow-x: hidden;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-flow: row;
  padding-right: 50px;
  gap: 50px;
}
  .game-card {
    width: 350px;
    height: 275px;
    margin-bottom: 0;
  }

  .game-text {
    font-size: 1.3em;
  }

}
</style>