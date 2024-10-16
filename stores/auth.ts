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
  // Le azioni sono funzioni che possono modificare lo stato
  actions: {
    // Questa azione setta il token e lo salva nel localStorage
    setToken(token: string) {
      this.token = token;
      // Salvo il token nel localStorage per mantenerlo dopo il refresh della pagina
      localStorage.setItem("token", token);
    },
    // Questa azione effettua il login dell'utente
    async login(username: string, password: string) {
      // Utilizzo il blocco try/catch per gestire gli errori
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
    logout() {
      // Reset dello stato quando l'utente si disconnette
      this.token = null;
      this.user = null;
      // Rimuovo il token dal localStorage
      localStorage.removeItem("token");
    },
  },
});
