<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth"; // Importo lo store di autenticazione

// Recupero lo store
const authStore = useAuthStore();

// Verifico se l'utente è autenticato tramite il getter
const isAuthenticated = authStore.isAuthenticated;

// Funzione per gestire il logout
const logout = () => {
  authStore.logout(); // Chiamata all'azione di logout
};
// Il sistema di routing di Nuxt.js è basato su Vue Router,
// in particolare utilizza il componente <NuxtLink> per gestire i link tra le pagine
// Il path è definito in base alla struttura delle cartelle del progetto
// I file index.vue sono sempre le pagine principali di una cartella,
// questo significa che il path / è associato al file index.vue della cartella pages
</script>

<template>
  <div class="container mt-5 d-flex flex-column align-items-center">
    <h1>Home Page</h1>
    <p>Benvenuto nella tua SPA!</p>

    <!-- Controllo se l'utente è autenticato -->
    <template v-if="isAuthenticated">
      <p>
        Attualmente sei connesso come: <strong>{{ authStore.getEmail }}</strong>
      </p>
      <button @click="logout" class="btn btn-danger mb-2">Logout</button>
      <NuxtLink to="/dashboard" class="btn btn-primary"
        >Vai alla Dashboard</NuxtLink
      >
    </template>

    <!-- Se l'utente non è autenticato, mostra il tasto per il login -->
    <template v-else>
      <NuxtLink to="/login" class="btn btn-primary"
        >Vai alla pagina di login</NuxtLink
      >
    </template>
  </div>
</template>
