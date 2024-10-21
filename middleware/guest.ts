import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Esegui il middleware solo sul lato client, non in SSR
  // Sara sempre true perche in nuxt.config.ts ho disabilitato SSR
  if (process.client) {
    console.log(
      "Eseguo middleware guest lato client:",
      authStore.isAuthenticated,
    );

    // Se l'utente è già autenticato, reindirizza alla dashboard
    if (authStore.isAuthenticated) {
      return navigateTo("/dashboard");
    }
  }
});
