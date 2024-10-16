<script lang="ts" setup>
import { ref } from "vue";

// Importa lo store di Pinia per l'autenticazione
import { useAuthStore } from "~/stores/auth";

const username = ref(""); // Definisce un campo reattivo per username
const password = ref(""); // Definisce un campo reattivo per password
const authStore = useAuthStore(); // Utilizza lo store di Pinia

// Funzione che effettua il login chiamando l'azione nello store
const login = () => {
  // Chiama l'azione login dello store di Pinia
  authStore.login(username.value, password.value); // Passa i dati inseriti
};
</script>

<template>
  <div class="container w-50 my-5">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
        <input v-model="username" placeholder="Username" class="form-control" />
      </div>
      <div class="mb-3">
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>
