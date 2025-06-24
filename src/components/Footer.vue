<template>
  <footer>
    <p class="footer-text">&copy; 2025 Instant Geek</p>
    <div class="footer-links">
      <a class="footer-link" href="/about">À propos</a> |
      <a class="footer-link" href="/privacy-policy">Politique de confidentialité</a> |
      <a class="footer-link" href="/terms-of-service">Conditions de ventes</a> |
      <a class="footer-link" href="/contact">Nous Contacter</a>
    </div>

    <div>
      <button class="footer-button btn btn-primary" @click="openModal">
        {{ getLangueText(selectedLangue) }} | {{ getDeviseText(selectedDevise) }}
      </button>
    </div>

    <div class="modal fade" id="preferencesModal" ref="preferencesModal" tabindex="-1" aria-labelledby="preferencesModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="preferencesModalLabel">Préférences</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="langueSelect" class="form-label">Langue :</label>
                <select class="form-select" id="langueSelect" v-model="selectedLangue">
                  <option v-for="langue in langues" :key="langue.value" :value="langue.value">
                    {{ langue.text }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="deviseSelect" class="form-label">Devise :</label>
                <select class="form-select" id="deviseSelect" v-model="selectedDevise">
                   <option v-for="devise in devises" :key="devise.value" :value="devise.value">
                    {{ devise.text }}
                  </option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-primary" @click="appliquerPreferences">Appliquer</button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
// Le script reste entièrement identique, aucune modification n'est nécessaire ici.
import { Modal } from 'bootstrap';

export default {
  name: 'Footer',
  data() {
    return {
      modalInstance: null, 
      selectedLangue: 'fr',
      selectedDevise: 'EUR',
      langues: [
        { value: 'fr', text: 'Français' },
        { value: 'en', text: 'Anglais' },
        { value: 'es', text: 'Espagnol' }
      ],
      devises: [
        { value: 'EUR', text: 'Euro (€)' },
        { value: 'USD', text: 'Dollar ($)' },
        { value: 'GBP', text: 'Livre (£)' }
      ]
    };
  },
  mounted() {
    const modalElement = this.$refs.preferencesModal;
    this.modalInstance = new Modal(modalElement);
    
    const storedLangue = localStorage.getItem('langue');
    const storedDevise = localStorage.getItem('devise');

    if (storedLangue) {
      this.selectedLangue = storedLangue;
    }
    if (storedDevise) {
      this.selectedDevise = storedDevise;
    }
  },
  methods: {
    getLangueText(langue) {
      const langueOption = this.langues.find(l => l.value === langue);
      return langueOption ? langueOption.text : 'Langue';
    },
    getDeviseText(devise) {
      const deviseOption = this.devises.find(d => d.value === devise);
      return deviseOption ? deviseOption.text : 'Devise';
    },
    openModal() {
      if (this.modalInstance) {
        this.modalInstance.show();
      }
    },
    appliquerPreferences() {
      localStorage.setItem('langue', this.selectedLangue);
      localStorage.setItem('devise', this.selectedDevise);
      
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    }
  }
};
</script>

<style scoped>
footer {
  background-color: var(--background-two);
  padding: 1rem;
  /* Le text-align: center s'appliquera maintenant au bouton sur mobile */
  text-align: center; 
}
.footer-text {
  color: var(--text-high-contrast);
  margin: 0;
}
.footer-links {
  color: var(--text-high-contrast);
  margin: 0.5rem 0;
}
.footer-link {
  color: var(--text-high-contrast);
  text-decoration: none;
  margin: 0 0.5rem;
}

/* MODIFICATION : Style par défaut (Mobile-First).
  Le bouton n'a plus de position "fixed". Il se comportera comme un élément normal
  et sera centré grâce au "text-align: center" de son parent, le footer.
*/
.footer-button {
  /* On ajoute une marge pour l'espacer des liens au-dessus sur mobile */
  margin-top: 1rem;
  /* On aligne le texte au centre pour les écrans plus petits */
  text-align: center;
  /* Styles cosmétiques existants */
  background-color: var(--solid-one);
  color: var(--text-high-contrast);;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: none;
}

/* MODIFICATION : Media Query pour les écrans plus larges (tablettes et ordinateurs).
  Ces règles ne s'appliqueront que si la largeur de l'écran est de 768px ou plus.
  768px est le point de rupture "md" (medium) standard de Bootstrap.
*/
@media (min-width: 990px) {
  .footer-text {
    /* On aligne le texte à gauche pour les écrans plus larges */
    text-align: left;
  }
  .footer-links {
    /* On aligne les liens à gauche pour les écrans plus larges */
    text-align: left;
  }
  .footer-button {
    /* On restaure le comportement "flottant" pour les grands écrans */
    position: relative;
    bottom: 20px;
    align-items: end;
    z-index: 1050;
    /* On retire la marge du haut qui n'est plus nécessaire */
  }
}

.modal-content {
  color: #000;
}
</style>