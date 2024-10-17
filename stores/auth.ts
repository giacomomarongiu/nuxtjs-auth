// Importo il plugin di Pinia
import { defineStore } from "pinia";
import type { AuthState, LoginResponse } from "~/types/logicTypes";

// Definisco uno store per l'autenticazione
export const useAuthStore = defineStore("auth", {
  // Definisco lo stato iniziale con il tipo AuthState
  state: (): AuthState => ({
    token: null,
    user: null,
  }),

  // Definisco dei getters
  getters: {
    isAuthenticated: (state): boolean => {
      return !!state.token; // Restituisce true se il token esiste
    },
  },

  // Definisco delle azioni per gestire il login e il logout
  actions: {
    // Questa azione setta il token e lo salva nel localStorage
    setToken(token: string) {
      this.token = token;
      // Salvo il token nel localStorage per mantenerlo dopo il refresh della pagina
      localStorage.setItem("token", token);
    },

    // Recupera il token dal localStorage quando l'app si carica
    initializeAuth() {
      if (process.client) {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          this.token = storedToken; // Imposta il token nello store
          console.log("Token recuperato dal localStorage:", this.token);
        } else {
          console.log("Nessun token trovato nel localStorage");
        }
      }
    },

    // Questa azione effettua il login dell'utente
    async login(username: string, password: string) {
      try {
        // Simulo una chiamata API per autenticare l'utente
        const response = await $fetch<LoginResponse>("/api/auth/login", {
          method: "POST", // Tipo di richiesta HTTP: POST è utilizzato per inviare dati
          body: { username, password }, // Corpo della richiesta: le credenziali dell'utente
        });

        // Setta il token restituito dall'API e salva l'utente
        this.setToken(response.token);
        this.user = response.user;
      } catch (error) {
        // Intercetto gli errori e li stampo in console
        console.error("Login failed", error);
      }
    },

    // Azione di logout
    logout() {
      // Reset dello stato quando l'utente si disconnette
      this.token = null;
      this.user = null;
      // Rimuovo il token dal localStorage
      localStorage.removeItem("token");
    },
  },
});
