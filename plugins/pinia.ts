import { createPinia } from "pinia";
import { defineNuxtPlugin } from "#app";
import { useAuthStore } from "~/stores/auth"; // Importa lo store di autenticazione

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);

  // Recupera lo store di autenticazione
  const authStore = useAuthStore();

  // Verifica se siamo in ambiente client (browser) e recupera il token dal localStorage
  if (process.client) {
    authStore.initializeAuth(); // Inizializza l'autenticazione recuperando il token dal localStorage
  }
});
