// Questo script definisce lo store per l'autenticazione tramite Pinia
// Lo store di Pinia è suddiviso in tre parti: state, getters e actions
// Lo state definisce lo stato iniziale dell'applicazione
// I getters permettono di accedere ai dati dello store in modo reattivo
// Le actions permettono di modificare lo stato dello store

import { defineStore } from "pinia";

// Per una tipizzazione migliore, importiamo il tipo AuthState e LoginResponse da logicTypes
import type { AuthState, LoginResponse } from "~/types/logicTypes";

// Definisco lo store per l'autenticazione
// Lo chiamo useAuthStore e lo definisco con defineStore di Pinia
// Il primo argomento è il nome dello store, il secondo argomento è un oggetto con state, getters e actions
export const useAuthStore = defineStore("auth", {
  // Definisco lo stato iniziale con il tipo AuthState
  state: (): AuthState => ({
    token: null,
    user: null, // Non viene usato da Reqres, ma lasciato per future espansioni
    mail: null,
  }),

  // Definisco dei getters per accedere ai dati dello store in modo reattivo
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

    // Questa azione setta l'email e la salva nel localStorage
    // anche se non è strettamente necessario per l'autenticazione
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

    // Azione di login tipizzata che accetta un URL come parametro
    // Se non viene passato, viene utilizzato l'URL di default di reqres
    async login(
      email: string,
      password: string,
      url: string = "https://reqres.in/api/login",
    ): Promise<void> {
      try {
        // Chiamata API per autenticare l'utente su un URL dinamico
        const response = await $fetch<LoginResponse>(url, {
          method: "POST", // Tipo di richiesta HTTP
          body: { email, password }, // Corpo della richiesta con le credenziali
        });

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
