<template>
  <div class="login-page-wrapper vh-100 d-flex align-items-center justify-content-center">
    <div class="login-card-container d-flex shadow-lg">
      <div class="login-form-section p-4 d-flex flex-column justify-content-center align-items-center text-center">
        <h2 class="login-title mb-4 text-white">inscription</h2>

        <form @submit.prevent="handleSignUp" class="w-100">
          <div class="form-group mb-3 text-start">
            <label for="email" class="form-label text-uppercase text-white-50">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control login-input"
              required
              aria-label="Email"
            />
          </div>
          <div class="form-group mb-3 text-start">
            <label for="password" class="form-label text-uppercase text-white-50">Mot de passe</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control login-input"
              required
              aria-label="Mot de passe"
            />
          </div>
          <div class="form-group mb-3 text-start">
            <label for="username" class="form-label text-uppercase text-white-50">Nom</label>
            <input
              id="username"
              v-model="username"
              type="text"
              class="form-control login-input"
              required
              aria-label="Nom d'utilisateur"
            />
          </div>
          <div class="form-group mb-3 text-start">
            <label for="firstname" class="form-label text-uppercase text-white-50">Prénom</label>
            <input
              id="firstname"
              v-model="firstname"
              type="text"
              class="form-control login-input"
              required
              aria-label="Prénom"
            />
          </div>
          <div class="form-group mb-3 text-start">
            <label for="birthdate" class="form-label text-uppercase text-white-50">Date de naissance</label>
            <input
              id="birthdate"
              v-model="birthdate"
              type="date"
              class="form-control login-input"
              required
              aria-label="Date de naissance"
            />
          </div>
          <div class="form-group mb-4 text-start">
            <label for="country" class="form-label text-uppercase text-white-50">Pays</label>
            <input
              id="country"
              v-model="country"
              type="text"
              class="form-control login-input"
              required
              aria-label="Pays"
            />
          </div>
          <button type="submit" class="btn login-btn w-100">valider</button>
        </form>

        <div class="d-flex justify-content-center w-100 mt-4 small-links">
          <router-link to="/connexion" class="text-decoration-none text-white-50">
            <i class="bi bi-arrow-left me-2"></i> RETOUR
          </router-link>
        </div>

        </div>

      <div class="login-image-section d-none d-md-flex align-items-center justify-content-center p-0">
        <router-link to="/" class="close-button" aria-label="Retour à l'accueil">
          <i class="bi bi-x-lg"></i> </router-link>
        <img
          src="/assets/img/inscription.jpg"
          alt="Illustration de jeux vidéo pour l'inscription"
          class="img-fluid login-background-image"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { signUp, signInWithGoogle } from '../services/authService';
import { useRouter } from 'vue-router';
import { db } from '../firebase'; // Make sure the path is correct to your firebase.js file
import { doc, setDoc } from 'firebase/firestore';

// Variables for form fields
const email = ref('');
const password = ref('');
const username = ref('');
const firstname = ref('');
const birthdate = ref('');
const country = ref('');

const router = useRouter();

async function handleSignUp() {
  try {
    const user = await signUp(email.value, password.value);

    if (user && user.uid) {
      await setDoc(doc(db, "users", user.uid), {
        email: email.value,
        username: username.value,
        firstname: firstname.value,
        birthdate: birthdate.value,
        country: country.value,
        createdAt: new Date()
      }, { merge: true });

      alert('Compte créé avec succès !');
      router.push('/');
    } else {
      throw new Error("L'utilisateur n'a pas été créé correctement par Firebase.");
    }
  } catch (e) {
    alert('Erreur lors de l\'inscription : ' + e.message);
  }
}

async function handleGoogleSignIn() {
  try {
    const user = await signInWithGoogle();
    alert('Connexion Google réussie !'); // Ajout d'un alert pour la démonstration
    router.push('/');
  } catch (e) {
    alert('Erreur avec Google : ' + e.message);
  }
}
</script>

<style scoped>
/* Global Wrapper for the Login Page */
.login-page-wrapper {
  background-color: var(--background-one); /* Dark background color */
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

/* Container for the Card (Form + Image) */
.login-card-container {
  width: 90%;
  max-width: 1300px;
  height: 780px; /* Hauteur actuelle */
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
}

/* Left Section: Login Form Styles */
.login-form-section {
  background-color: var(--interactive-comp-one);
  flex: 0 0 40%;
  padding: 40px !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.login-title {
  font-size: 2.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-high-contrast) !important;
  margin-bottom: 3rem;
  letter-spacing: 2px;
}

/* Form Group and Labels */
.form-group {
  width: 100%;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-high-contrast) !important;
}

/* Input Fields */
.login-input {
  background-color: var(--interactive-comp-two);
  border: 1px solid var(--border-separator-one);
  color: var(--text-high-contrast);
  padding: 0.8rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
}

.login-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.login-input:focus {
  background-color: var(--interactive-comp-three);
  border-color: var(--interactive-comp-four);
  box-shadow: 0 0 0 0.25rem rgba(80, 160, 189, 0.25);
  color: #fff;
}

/* Main Button */
.login-btn {
  background-color: var(--interactive-comp-three);
  border: none;
  color: var(--text-high-contrast);
  font-weight: bold;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  width: 100%;
}

.login-btn:hover {
  background-color: var(--interactive-comp-two);
  color: var(--text-high-contrast);
}

/* Small links (e.g., S'inscrire, Mot de passe oublié, Retour) */
.small-links {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-high-contrast);
  margin-top: 1rem;
  width: 100%;
}

.small-links a {
    color: inherit !important;
}

.small-links a:hover {
  color: var(--text-one) !important;
}

/* Social Login Separator (Not present in this template, but keeping styles for consistency) */
.social-login-separator {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-high-contrast);
  margin: 1rem 0;
  width: 100%;
}

/* Social Icons (Not present in this template, but keeping styles for consistency) */
.social-icons {
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

.social-icon-btn {
  background-color: var(--interactive-comp-one);
  border: 1px solid var(--border-separator-one);
  color: var(--text-high-contrast);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.social-icon-btn:hover {
  background-color: var(--interactive-comp-two);
  border-color: var(--interactive-comp-three);
}

.google-btn i { color: #DB4437; }
.discord-btn i { color: #7289DA; }
.facebook-btn i { color: #3b5998; }

/* Right Section: Image */
.login-image-section {
  background-color: #F8F8F8; /* Couleur de fond de secours */
  flex: 0 0 60%;
  border-radius: 0 15px 15px 0;
  overflow: hidden;
  position: relative; /* AJOUTÉ: Nécessaire pour le positionnement absolu du bouton de fermeture */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Style for the actual background image */
.login-background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* Style for the Close Button */
.close-button {
  position: absolute;
  top: 15px; /* Distance du haut */
  right: 15px; /* Distance de la droite */
  color: #fff; /* Couleur de la croix */
  font-size: 1.8rem; /* Taille de l'icône */
  text-decoration: none; /* Pas de soulignement */
  z-index: 10; /* S'assure qu'elle est au-dessus de l'image */
  background-color: rgba(0, 0, 0, 0.4); /* Fond semi-transparent pour la visibilité */
  border-radius: 50%; /* Bouton rond */
  width: 40px; /* Largeur du bouton */
  height: 40px; /* Hauteur du bouton */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.6); /* Fond plus sombre au survol */
  color: var(--interactive-comp-four); /* Couleur d'accent au survol */
}

/* Media Queries for Responsiveness */
@media (max-width: 767.98px) {
  .login-card-container {
    flex-direction: column;
    min-height: auto;
    height: auto;
    border-radius: 15px;
    width: 95%;
  }

  .login-form-section {
    flex: 1 1 100%;
    border-radius: 15px;
    padding: 30px !important;
  }

  .login-image-section {
    display: none !important;
  }

  .login-title {
    font-size: 2.2rem;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .login-card-container {
    max-width: 900px;
    height: 680px;
  }
  .login-form-section {
    flex: 0 0 45%;
  }
  .login-image-section {
    flex: 0 0 55%;
  }
}
</style>