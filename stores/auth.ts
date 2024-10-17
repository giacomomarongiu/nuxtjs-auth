import { useRouter } from "vue-router";
import type { AuthState, LoginResponse } from "~/types/logicTypes";

// Definisco lo store per l'autenticazione
export const useAuthStore = defineStore("auth", {
  // Definisco lo stato iniziale con il tipo AuthState
  state: (): AuthState => ({
    token: null,
    user: null, // Non viene usato da Reqres, ma lasciato per future espansioni
    mail: null,
  }),

  // Definisco dei getters
  getters: {
    isAuthenticated: (state: AuthState): boolean => !!state.token, // Verifica se il token esiste
    getToken: (state: AuthState): string | null => state.token, // Restituisce il token
    getEmail: (state: AuthState): string | null => state.mail, // Restituisce l'email
  },

  // Definisco delle azioni per gestire il login e il logout
  actions: {
    // Questa azione setta il token e lo salva nel localStorage
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },

    setUserEmail(email: string) {
      this.mail = email;
      localStorage.setItem("mail", email);
    },

    // Recupera il token e l'email dal localStorage quando l'app si carica
    initializeAuth() {
      if (process.client) {
        const storedToken = localStorage.getItem("token");
        const storedEmail = localStorage.getItem("mail");

        if (storedToken) {
          this.token = storedToken;
          console.log("Token recuperato dal localStorage:", this.token);
        } else {
          console.log("Nessun token trovato nel localStorage");
        }

        if (storedEmail) {
          this.mail = storedEmail;
          console.log("Email recuperata dal localStorage:", this.mail);
        } else {
          console.log("Nessuna email trovata nel localStorage");
        }
      }
    },

    // Azione di login tipizzata
    async login(email: string, password: string): Promise<void> {
      try {
        // Chiamata API per autenticare l'utente su Reqres.in
        const response = await $fetch<LoginResponse>(
          "https://reqres.in/api/login",
          {
            method: "POST", // Tipo di richiesta HTTP
            body: { email, password }, // Corpo della richiesta con le credenziali
          },
        );

        // Setta il token e l'email restituiti dall'API
        this.setToken(response.token);
        this.setUserEmail(email);
        console.log("Login avvenuto con successo, token:", response.token);
      } catch (error) {
        console.error("Login fallito", error);
      }
    },

    // Azione di logout
    logout(): void {
      // Reset dello stato
      this.token = null;
      this.user = null;
      this.mail = null;

      // Rimuovo il token e l'email dal localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("mail");

      // Reindirizzo l'utente alla pagina di login
      const router = useRouter();
      router.push("/login");
    },
  },
});
