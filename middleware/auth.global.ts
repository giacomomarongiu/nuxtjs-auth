import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore(); // Recupera il tuo store di autenticazione

  const isAuthenticated = authStore.isAuthenticated; // Usa la tua logica di autenticazione

  // Controlla se la rotta richiede autenticazione
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Se non autenticato, reindirizza a /login
    return navigateTo("/login"); // Reindirizza a /login se non autenticato
  }
  // Se autenticato, continua
});
