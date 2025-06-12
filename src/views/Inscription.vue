<template>
  <div class="container mt-5">
    <h2 class="text-center page-title">Créer un compte</h2>

    <!-- Auth par email -->
    <form @submit.prevent="handleSignUp">
      <input v-model="email" type="email" placeholder="Email" class="form-control" required />
      <input v-model="password" type="password" placeholder="Mot de passe" class="form-control" required />
      <input type="text" placeholder="Nom d'utilisateur" class="form-control" required />
      <input type="text" placeholder="Prénom" class="form-control" required />
      <input type="date" placeholder="Date de naissance" class="form-control" required />
      <input type="text" placeholder="Pays" class="form-control" required />
      <button class="btn btn-primary mt-2">S'inscrire</button>
    </form>

    <!-- Ou se connecter avec Google -->
    <div class="text-center mt-4">
      <p>— ou —</p>
      <button @click="handleGoogleSignIn" class="btn btn-outline-danger w-100">
        <i class="bi bi-google"></i> Continuer avec Google
      </button>
    </div>

    <router-link class="d-block mt-3 text-center" to="/connexion">
      Déjà inscrit ? Connexion
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { signUp, signInWithGoogle } from '../services/authService';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

async function handleSignUp() {
  try {
    await signUp(email.value, password.value);
    router.push('/');
  } catch (e) {
    alert('Erreur : ' + e.message);
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
.container {
  max-width: 420px;
  margin: 0 auto;
}
.page-title {
  margin-bottom: 30px;
  font-weight: bold;
  color: #333;
}
.form-control {
  margin-bottom: 10px;
}
.btn {
  width: 100%;
}
</style>
