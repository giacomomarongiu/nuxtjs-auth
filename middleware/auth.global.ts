// Middleware globale per la gestione dell'autenticazione
// In Nuxt, i middleware globali vengono eseguiti su ogni rotta
// Se la rotta richiede autenticazione, reindirizza a /login

import { useAuthStore } from "~/stores/auth";
import type { RouteLocationNormalized } from "vue-router";

//defineNuxtRouteMiddleware è un'utility di Nuxt per definire middleware
export default defineNuxtRouteMiddleware(
  // To e From sono oggetti RouteLocationNormalized che rappresentano la rotta attuale e precedente
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    //console.log(from);
    //console.log(to);
    const authStore = useAuthStore(); // Recupera il mio store di autenticazione
    const isAuthenticated: boolean = authStore.isAuthenticated; // Tipizza esplicitamente come boolean

    // Escludo la pagina di login dal middleware globale per evitare loop infiniti
    if (to.path === "/login") {
      //console.log(to.path);
      return;
    }
    // Verifico se la rotta richiede autenticazione e in caso contrario, reindirizzo a /login
    // meta è un oggetto che contiene i metadati della rotta
    // In questo caso, requiresAuth è un booleano che indica se la rotta richiede autenticazione
    // che ho definito nel file types/logicTypes.ts
    if (to.meta.requiresAuth && !isAuthenticated) {
      // Se non autenticato, reindirizza a /login
      //console.log(to.meta.requiresAuth);
      // navigateTo è un'utility di Nuxt per navigare a una pagina, simile a $router.push
      // La differenza è che navigateTo è tipizzato e può essere utilizzato nei middleware
      return navigateTo("/login"); // navigateTo è già tipizzato da Nuxt
    }

    // Se autenticato, continua
    //NOTA: In futuro dovro' aggiungere un controllo per verificare se il token è scaduto
  },
);
