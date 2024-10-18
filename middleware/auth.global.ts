import { useAuthStore } from "~/stores/auth";
import type { RouteLocationNormalized } from "vue-router"; // Tipo di route

export default defineNuxtRouteMiddleware(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    console.log(from);
    console.log(to);
    const authStore = useAuthStore(); // Recupera il tuo store di autenticazione

    const isAuthenticated: boolean = authStore.isAuthenticated; // Tipizza esplicitamente come boolean

    // Escludi la pagina di login dal middleware globale
    if (to.path === "/login") {
      //console.log(to.path);
      return;
    }
    // Controlla se la rotta richiede autenticazione
    if (to.meta.requiresAuth && !isAuthenticated) {
      // Se non autenticato, reindirizza a /login
      //console.log(to.meta.requiresAuth);
      return navigateTo("/login"); // navigateTo è già tipizzato da Nuxt
    }

    // Se autenticato, continua
  },
);
