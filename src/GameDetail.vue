<template>
    <!-- <div class="img-wrap">
        <img src="game.imageName"/>
    </div>
    <div class="game-details">
        <h1>{{ game.name }}</h1>
    </div>-->
</template>

<script>
import { collection, getDocs, query, where } from '../firebase/firestore';
import { db } from '..firebase/index.js';
import { ref, onMounted } from 'vue';

export default {
  name: "GameDetail",
  data() {
    return {
      games: [],
      game: null
    };
  },
  async mounted() {
    const selectedIds = ['kn9pH1dkwMBBF3YOvmvN', 'sTIYDzvGIubJuR7DOIaD', 'NUSTlf7nbt76DKvcEFmv'];

    try {
      const gamesRef = collection(db, 'games');
      const gamesQuery = query(gamesRef, where('__name__', 'in', selectedIds)); // Remplace 'name' par '__name__' si tu filtres par ID
      const querySnapshot = await getDocs(gamesQuery);

      this.games = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.games.push({
          id: doc.id,
          titre: data.name,
          link: data.link,
          image: data.image,
          price: `${data.price}€`,
        });
      });

      // Récupère le jeu selon l'ID passé dans la route
      this.game = this.games.find(game => game.id === this.$route.params.gameId);
    } catch (error) {
      console.error('Erreur lors de la récupération des jeux :', error);
    }
  }
};
</script>