import { useAuthStore } from "~/stores/auth";
import type { RouteLocationNormalized } from "vue-router"; // Tipo di route

export default defineNuxtRouteMiddleware(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const authStore = useAuthStore(); // Recupera il tuo store di autenticazione

    const isAuthenticated: boolean = authStore.isAuthenticated; // Tipizza esplicitamente come boolean

    // Controlla se la rotta richiede autenticazione
    if (to.meta.requiresAuth && !isAuthenticated) {
      // Se non autenticato, reindirizza a /login
      return navigateTo("/login"); // navigateTo è già tipizzato da Nuxt
    }

    // Se autenticato, continua
  },
);
