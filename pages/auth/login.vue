<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

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
  authStore.setToken("test-token"); // Usa la funzione setToken per impostare e salvare il token nel localStorage
  authStore.user = { name: "Test User", email: "testuser@example.com" }; // Imposta un utente di test
  console.log("Autenticazione simulata:", authStore.token);

  // Verifica se il token è stato salvato correttamente nel localStorage
  console.log("Token nel localStorage:", localStorage.getItem("token"));

  // Reindirizza l'utente alla dashboard
  router.push("/dashboard"); // Redirezione alla pagina protetta
};

definePageMeta({
  middleware: "guest", // Applica il middleware per bloccare gli utenti autenticati
});
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
