// ~/composables/useLogin.ts
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { ref, Ref } from "vue";

export const useLogin = (): {
  email: Ref<string>;
  password: Ref<string>;
  login: () => Promise<void>;
} => {
  const router = useRouter();
  const authStore = useAuthStore();
  const email: Ref<string> = ref("");
  const password: Ref<string> = ref("");

  const login = async (): Promise<void> => {
    try {
      // Effettua il login chiamando lo store di Pinia
      await authStore.login(email.value, password.value);
      // Se l'utente è autenticato, reindirizza
      if (authStore.isAuthenticated) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
    }
  };

  return {
    email,
    password,
    login,
  };
};
