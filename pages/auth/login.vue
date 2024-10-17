<script lang="ts" setup>
import { ref } from "vue";

// Importa lo store di Pinia per l'autenticazione
import { useAuthStore } from "~/stores/auth";

const username = ref(""); // Definisce un campo reattivo per username
const password = ref(""); // Definisce un campo reattivo per password
const authStore = useAuthStore(); // Utilizza lo store di Pinia
const router = useRouter(); // Inizializza il router

// Funzione che effettua il login chiamando l'azione nello store
const login = () => {
  // Chiama l'azione login dello store di Pinia
  authStore.login(username.value, password.value); // Passa i dati inseriti
};

// Funzione per simulare il login e forzare il token
const simulateLogin = () => {
  authStore.$state.token = "test-token"; // Imposta un token fittizio per simulare l'autenticazione
  authStore.user = { name: "Test User", email: "testuser@example.com" }; // Imposta un utente di test
  console.log("Autenticazione simulata:", authStore.$state.token);
  // Reindirizza l'utente alla dashboard
  router.push("/dashboard"); // Redirezione alla pagina protetta
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
      <button @click="simulateLogin" type="submit" class="btn btn-primary">
        Login
      </button>
    </form>
  </div>
</template>
