<template>
    <div class="container-fluid py-2 preco">
        <div>
            <h1 class="mt-3">Précommandes</h1>
            <p class="mb-5">Réservez dès maintenant les articles à venir.</p>
            <ul id='precoIn'>
                <li v-for="game in games" :key="game.id">
                    <div class="game-card">
                        <a :href="game.link"><img :src="`/assets/img/preview/${game.image}`" :alt="game.titre" /></a>
                        <div class="game-text">
                            <h3 class="titre">{{ game.titre }}</h3>
                            <h3 class="prix">{{ game.price }}</h3>
                        </div>
                        <p class="dateSortie">{{ game.date }}</p>
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
        orderBy('dateSortie')
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
                date: data.dateSortie.toDate().toLocaleDateString('fr-FR'),
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

h1, p{
    text-align: center;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;

}

a {
    text-decoration: none;
}

.container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.preco {
    align-items: end;
    justify-content: end;
}

#precoIn {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 0;
    max-width: 1300px; /* ou 1200px selon votre préférence */
    margin: 0 auto;
}

.game-card {
    width: 100%;
    height: auto;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    transition: all 300ms;
    margin: 0;
}

.game-card:hover {
    transform: scale(1.1);

}

.game-card img {
    inline-size: 100%;
    aspect-ratio: 16 / 9;
    object-fit: fill;
    display: grid;
    grid-template-rows: min-content;
    border-radius: 5%;
}

.game-card img:hover {
    box-shadow: 4px 5px 17px -4px #268391;
}

.game-card h3 {
    margin-left: 1px;
    margin-top: 5px;
    font-size: 1em
}

.game-card .game-text {
    display: flex;
    justify-content: space-between;
}

.dateSortie{
    text-align: start;
}

@media (min-width: 1250px) {

    h1, p{
    text-align: start;
    margin-left: 50px;
}

.dateSortie{
    text-align: start;
    margin: 0px;
}

    #precoIn {
        overflow-x: visible;
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-flow: row;
        margin-left: auto;
        margin-right: auto;
        gap: 50px;
        padding: 0 80px; /* Plus d'espace sur grand écran */
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