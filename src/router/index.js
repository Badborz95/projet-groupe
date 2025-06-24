import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue'

// Nous importons les composants pour les autres pages.
// Vous devrez créer ces fichiers dans votre dossier /views.
import Nouveautes from '../views/Nouveautes.vue'
import Precommandes from '../views/Precommandes.vue'
import ProchainesSorties from '../views/ProchainesSorties.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: Accueil
    },
    {
      path: '/nouveautes',
      name: 'nouveautes',
      component: Nouveautes
    },
    {
      path: '/precommandes',
      name: 'precommandes',
      component: Precommandes
    },
    {
        path: '/prochaines-sorties',
        name: 'prochaines-sorties',
        component: ProchainesSorties
    },
    { 
        path: '/inscription',
        name: 'inscription', // Ajout d'un nom pour la route d'inscription
        component: Inscription 
    },
    { 
        path: '/connexion',
        name: 'connexion', // Ajout d'un nom pour la route de connexion
        component: Connexion 
    },
    {
      path: '/games/gameId',
      name: 'games/gameId',
      component: GameDetail,
    }
    // Ajoutez d'autres routes ici si nécessaire
  ],
  // Cette fonction permet de styliser le lien actif dans la navbar
  linkActiveClass: 'active' 
})

export default router
