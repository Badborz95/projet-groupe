<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container-fluid">
      <router-link class="navbar-brand fw-bold me-auto" to="/">
        <img
          src="/assets/img/Logo.png"
          alt="Logo"
          width="150"
          height="50"
          class="d-inline-block align-text-top"
        >
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        @click="toggleCollapse"
        aria-controls="navbarSupportedContent"
        :aria-expanded="isCollapsed ? 'true' : 'false'"
        aria-label="Toggle navigation"
      >
        <svg class="navbar-toggler-icon-svg" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M4 7h22M4 15h22M4 23h22"/>
        </svg>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent" ref="collapseElement">
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
        <div class="d-flex align-items-center">
          <form class="d-none d-lg-flex me-3" role="search">
            <input class="form-control me-2" type="search" placeholder="Rechercher..." aria-label="Search">
            <button class="btn btn-outline-secondary" type="submit">
              <i class="bi bi-search"></i>
            </button>
          </form>
          <router-link class="nav-link fs-5 text ms-2" to="/connexion"><i class="bi bi-person-circle"></i></router-link>
          <router-link class="nav-link fs-5 text ms-2" to="/panier"><i class="bi bi-cart3"></i></router-link>
          <button id="theme_btn" class="btn btn-primary " @click="toggleDarkMode">
            <img v-if="isDarkMode" src="/assets/img/sun.svg" alt="Light mode" width="24" height="24" />
            <img v-else src="/assets/img/moon.svg" alt="Dark mode" width="24" height="24" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Collapse } from 'bootstrap';
import { isDarkMode, toggleDarkMode } from '../services/darkMode.js'


const collapseElement = ref(null);
let bsCollapse = null;
const isCollapsed = ref(false);

onMounted(() => {
  if (collapseElement.value) {
    bsCollapse = new Collapse(collapseElement.value, { toggle: false });
  }

});

const toggleCollapse = () => {
  if (!bsCollapse) return;
  if (collapseElement.value.classList.contains('show')) {
    bsCollapse.hide();
    isCollapsed.value = false;
  } else {
    bsCollapse.show();
    isCollapsed.value = true;
  }
};
</script>

<style scoped>
/* Style pour la Navbar */
.navbar {
  background-color: var(--background-two)!important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-link {
  font-weight: 500;
  color: var(--text-one) !important;
  margin: 0 0.5rem;
  transition: color 0.3s ease;
}
.nav-link:hover,
.nav-link.active {
  color: #BEEDFF;
}

.navbar-toggler {
  border-color: transparent;
}

.navbar-toggler-icon-svg {
  display: block; 
  width: 1.5em; 
  height: 1.5em;
  line-height: 1; 
  color: var(--text-high-contrast); 
}

.btn-primary {
  --bs-btn-color: #fff;
  --bs-btn-bg: var(--interactive-comp-two);
  --bs-btn-border-color: none;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: var(--interactive-comp-three);
  --bs-btn-hover-border-color: var(--border-separator-one);
  --bs-btn-focus-shadow-rgb: 49, 132, 253;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: var(--interactive-comp-three);
  --bs-btn-active-border-color: var(--border-separator-one);
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: var(--interactive-comp-two);
  --bs-btn-disabled-border-color: var(--interactive-separator-one);

  color: #E7FFFC;
}
</style>