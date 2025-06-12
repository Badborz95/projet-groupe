<template>
  <div class="container mt-5">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" class="form-control mb-2" required />
      <input v-model="password" type="password" placeholder="Mot de passe" class="form-control mb-2" required />
      <button class="btn btn-success">Connexion</button>
    </form>
    <router-link class="d-block mt-3" to="/inscription">Créer un compte</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { signIn } from '../services/authService';
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
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
}
</style>