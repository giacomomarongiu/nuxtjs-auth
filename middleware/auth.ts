import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Se non c'è un token e l'utente non sta cercando di accedere a /login, viene reindirizzato
  if (!authStore.token && to.name !== "login") {
    return navigateTo("/login");
  }
});
