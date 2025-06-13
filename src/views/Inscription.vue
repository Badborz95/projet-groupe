<template>
  <div class="container-fluid vh-100 d-flex align-items-center justify-content-center bg-dark">
    <div class="row w-100 max-w-custom-card">
      <div class="col-md-6 d-flex align-items-center justify-content-center">
        <div class="card shadow-lg p-4 custom-card-width">
          <div class="card-body">
            <h2 class="card-title text-center mb-4 text-primary">Créer un compte</h2>
            <form @submit.prevent="handleSignUp">
              <div class="mb-3">
                <label for="email" class="form-label text-muted">Email</label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Entrez votre email"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label text-muted">Mot de passe</label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="username" class="form-label text-muted">Nom d'utilisateur</label>
                <input
                  id="username"
                  v-model="username"
                  type="text"
                  placeholder="Votre nom d'utilisateur"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="firstname" class="form-label text-muted">Prénom</label>
                <input
                  id="firstname"
                  v-model="firstname"
                  type="text"
                  placeholder="Votre prénom"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="birthdate" class="form-label text-muted">Date de naissance</label>
                <input
                  id="birthdate"
                  v-model="birthdate"
                  type="date"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="country" class="form-label text-muted">Pays</label>
                <input
                  id="country"
                  v-model="country"
                  type="text"
                  placeholder="Votre pays"
                  class="form-control"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary w-100 mt-3">S'inscrire</button>
            </form>

            <div class="text-center mt-4">
              <p class="mb-2 text-muted">— ou —</p>
              <button @click="handleGoogleSignIn" class="btn btn-outline-danger w-100">
                <i class="bi bi-google me-2"></i> Continuer avec Google
              </button>
            </div>

            <div class="text-center mt-3">
              <router-link to="/connexion" class="small text-decoration-none text-info">
                Déjà inscrit ? Connexion
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 d-none d-md-flex align-items-center justify-content-center p-0">
        <img
          src="/assets/img/inscription-img.jpg" alt="Illustration de jeux vidéo"
          class="img-fluid rounded-end shadow-lg h-100 object-fit-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { signUp, signInWithGoogle } from '../services/authService'; // Assurez-vous que le chemin est correct
import { useRouter } from 'vue-router';

// Variables pour les champs du formulaire
const email = ref('');
const password = ref('');
const username = ref('');
const firstname = ref('');
const birthdate = ref('');
const country = ref('');

const router = useRouter();

async function handleSignUp() {
  try {
    // Vous devrez probablement passer plus de données à votre fonction signUp
    // si vous voulez enregistrer le nom d'utilisateur, le prénom, etc. dans Firestore.
    // Pour l'instant, je ne passe que l'email et le mot de passe comme dans votre code original.
    await signUp(email.value, password.value);

    // Idéalement, après l'inscription Firebase, vous ajouteriez les autres informations
    // (username, firstname, birthdate, country) à un document Firestore pour l'utilisateur.
    // Exemple (à adapter selon votre structure Firestore) :
    // import { db } from '../firebaseConfig'; // Assurez-vous d'importer votre instance Firestore
    // import { doc, setDoc } from 'firebase/firestore';
    // const user = auth.currentUser; // Obtenez l'utilisateur actuellement connecté
    // if (user) {
    //   await setDoc(doc(db, "users", user.uid), {
    //     username: username.value,
    //     firstname: firstname.value,
    //     birthdate: birthdate.value,
    //     country: country.value,
    //     email: email.value
    //   });
    // }

    router.push('/');
  } catch (e) {
    alert('Erreur lors de l\'inscription : ' + e.message);
  }
}

async function handleGoogleSignIn() {
  try {
    await signInWithGoogle();
    router.push('/');
  } catch (e) {
    alert('Erreur avec Google : ' + e.message);
  }
}
</script>

<style scoped>
/* Personnalisation générale du conteneur */
.container-fluid {
  background-color: #212529; /* Couleur de fond sombre pour le thème jeu vidéo */
}

/* Ajustement de la largeur maximale pour le conteneur row pour un meilleur contrôle du design */
.max-w-custom-card {
  max-width: 1000px; /* Ajustez selon vos préférences */
  width: 90%; /* Pour la responsivité */
  border-radius: 15px; /* Arrondir les coins de la structure globale */
  overflow: hidden; /* S'assurer que les coins arrondis sont appliqués */
}

/* Style de la carte (formulaire) */
.card {
  border: none;
  border-radius: 15px 0 0 15px; /* Arrondir uniquement les coins du côté formulaire */
  background-color: #ffffff; /* Fond blanc ou très clair pour la carte */
  color: #333;
}

/* Pour la partie image, arrondir les coins opposés */
.img-fluid.rounded-end {
  border-radius: 0 15px 15px 0 !important;
}

/* Style du titre pour le rendre plus impactant */
.card-title {
  font-weight: 700;
  color: #0d6efd; /* Utilisation d'une couleur Bootstrap primary */
}

/* Ajustement général des inputs */
.form-control {
  border-radius: 8px;
  border-color: #ced4da;
}

.form-control:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25); /* Ombre de focus Bootstrap primary */
  border-color: #0d6efd;
}

/* Boutons */
.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
  font-weight: bold;
  border-radius: 8px;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0b5ed7;
}

.btn-outline-danger {
  border-radius: 8px;
  font-weight: bold;
}

/* Pour l'image, s'assurer qu'elle occupe bien la hauteur et gère l'overflow */
.h-100 {
  height: 100%;
}

.object-fit-cover {
  object-fit: cover;
}

/* Ajustement de la largeur de la carte du formulaire pour qu'elle ne soit pas trop large sur mobile */
.custom-card-width {
    width: 100%; /* Par défaut sur mobile */
    max-width: 450px; /* Limite la largeur sur des écrans plus grands que md */
}


/* Media queries pour la responsivité */
@media (max-width: 767.98px) {
  /* Sur les petits écrans, l'image disparaît */
  .col-md-6.d-none.d-md-flex {
    display: none !important;
  }
  /* La carte occupe toute la largeur et a des coins arrondis des deux côtés */
  .card {
    border-radius: 15px;
  }
}
</style>