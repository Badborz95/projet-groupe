<template>
  <BNavbar
  v-b-color-mode="'dark'"
  toggleable="lg"
  variant="primary"
>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container-fluid">
        <!-- Logo à gauche -->
        <router-link class="navbar-brand fw-bold me-auto" to="/">
          <img src="../assets/logo.png" alt="Logo" width="150" height="50" class="d-inline-block align-text-top">
        </router-link>
        <!-- Section centrale mobile : Icône de recherche OU barre de recherche -->
        <div class="d-flex d-lg-none flex-grow-1 justify-content-center mx-2">
          <!-- Affiche l'icône si la recherche n'est pas active -->
          <a href="#" class="loupe nav-link fs-5 text-dark" v-if="!isMobileSearchActive" @click.prevent="activateMobileSearch">
            <i class="bi bi-search"></i>
          </a>
          <!-- Affiche la barre de recherche si elle est active -->
          <form v-else class="d-flex w-100" role="search" @submit.prevent>
            <input 
              class="form-control" 
              type="search" 
              placeholder="Rechercher..."
              aria-label="Rechercher"
              ref="searchInputRef"
              @blur="isMobileSearchActive = false"
            >
          </form>
        </div>

        <!-- Bouton pour le menu Burger mobile -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Contenu de la Navbar qui se cache sur mobile -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          
          <!-- Section centrale : Liens de navigation (Desktop) -->
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/nouveautes">Nouveautés</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/precommandes">Précommandes</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/prochaines-sorties">Prochaines sorties</router-link>
            </li>
          </ul>

          <!-- Section de droite : Barre de recherche Desktop et Icônes -->
          <div class="d-flex align-items-center">
              
              <!-- Barre de recherche Desktop (cachée sur mobile) -->
              <form class="d-none d-lg-flex me-3" role="search">
                <input class="form-control me-2" type="search" placeholder="Rechercher..." aria-label="Search">
                <button class="btn btn-outline-secondary" type="submit">
                  <i class="bi bi-search"></i>
                </button>
              </form>

              <!-- Icônes Profil et Panier -->
              <a href="#" class="nav-link fs-5 text ms-2"><i class="bi bi-person-circle"></i></a>
              <a href="#" class="nav-link fs-5 text ms-2"><i class="bi bi-cart3"></i></a>
          </div>
        </div>
      </div>
    </nav>
  </BNavbar>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

// Gère l'état d'affichage de la barre de recherche sur mobile
const isMobileSearchActive = ref(false);

// Référence à l'élément input pour pouvoir le focus
const searchInputRef = ref(null);

// Fonction pour activer la recherche mobile
const activateMobileSearch = () => {
  isMobileSearchActive.value = true;
};

// Ce "watcher" surveille le changement de la variable isMobileSearchActive
watch(isMobileSearchActive, (isActive) => {
  // Si la variable passe à `true` (la barre de recherche devient visible)
  if (isActive) {
    // On attend que le DOM soit mis à jour avant d'essayer de focus l'input
    nextTick(() => {
      if (searchInputRef.value) {
        searchInputRef.value.focus();
      }
    });
  }
});
</script>

<style scoped>
/* Style pour la Navbar */
.navbar {
  background-color: #0E181C!important; /* Couleur de fond blanche */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Ombre légère */
}

/* Style pour les liens de navigation */
.nav-link {
  font-weight: 500;
  color: #E7FFFC;
  margin: 0 0.5rem;
  transition: color 0.3s ease;
}
.loupe {
  padding: 0 10px;
  background: #50A0BD;
  border-radius: 20px;
}
.nav-link:hover,
.nav-link.active {
  color: #BEEDFF; /* Couleur bleue de Bootstrap pour l'état actif/survol */
}

/* Style pour le burger */
.navbar-toggler {
  border-color: transparent; /* Supprime la bordure du bouton burger */
  color: #E7FFFC; /* Couleur des icônes du burger */
}
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(231, 255, 252, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"); /* Couleur des lignes du burger */
}

/* Ajustement pour que la recherche et les icônes ne passent pas à la ligne trop vite */
.navbar-collapse {
    flex-grow: 1;
}

/* Permet au logo de ne pas être écrasé par la recherche mobile */
.navbar-brand {
    flex-shrink: 0;
}
</style>
