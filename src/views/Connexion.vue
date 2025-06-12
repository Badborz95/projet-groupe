<template>
  <div class="container mt-5">
    <h2 class="text-center page-title">Connexion</h2>

    <!-- Formulaire classique -->
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" class="form-control" required />
      <input v-model="password" type="password" placeholder="Mot de passe" class="form-control" required />
      <button class="btn btn-success mt-2">Se connecter</button>
    </form>

    <!-- Auth Google -->
    <div class="text-center mt-4">
      <p>— ou —</p>
      <button @click="handleGoogleSignIn" class="btn btn-outline-danger w-100">
        <i class="bi bi-google"></i> Se connecter avec Google
      </button>
    </div>

    <router-link class="d-block mt-3 text-center" to="/inscription">
      Pas encore de compte ? Créer un compte
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { signIn, signInWithGoogle } from '../services/authService';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

async function handleLogin() {
  try {
    await signIn(email.value, password.value);
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
