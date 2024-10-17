import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";

export function useLoginSimulation() {
  const authStore = useAuthStore();
  const router = useRouter();

  const simulateLogin = () => {
    authStore.setToken("test-token"); // Usa la funzione setToken per impostare e salvare il token nel localStorage
    authStore.user = { name: "Test User", email: "testuser@example.com" }; // Imposta un utente di test

    console.log("Autenticazione simulata:", authStore.token);

    // Verifica se il token è stato salvato correttamente nel localStorage
    console.log("Token nel localStorage:", localStorage.getItem("token"));

    // Reindirizza l'utente alla dashboard
    router.push("/dashboard"); // Redirezione alla pagina protetta
  };

  return {
    simulateLogin,
  };
}
