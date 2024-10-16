import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  //console.log("Middleware auth eseguito su qualsiasi rotta:", to.path);

  const authStore = useAuthStore();

  // Se l'utente non è autenticato e sta cercando di accedere a una pagina protetta, reindirizza al login
  if (!authStore.token && to.path.startsWith("/protected")) {
    //console.log("Utente non autenticato, reindirizzamento a /auth/login");

    return navigateTo("/auth/login");
  }
});
