// Questo composable gestisce la logica di login dell'utente
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { ref, Ref } from "vue";

export const useLogin = (): {
  // Grazie a TypeScript possiamo definire i tipi di ritorno
  // Ref è un tipo che permette di creare una variabile reattiva
  email: Ref<string>;
  password: Ref<string>;
  login: () => Promise<void>;
} => {
  //  Ottengo l'istanza del router e dello store di autenticazione
  const router = useRouter();
  const authStore = useAuthStore();

  // Creo due variabili reattive per email e password
  const email: Ref<string> = ref("");
  const password: Ref<string> = ref("");

  // Funzione di login
  const login = async (): Promise<void> => {
    // Provo a fare il login e gestisco eventuali errori
    try {
      // Effettua il login chiamando lo store di Pinia
      // Await serve per attendere la risposta
      // Posso anche fornire un url come parametro, ma in questo caso non è necessario
      // L'url che mi serve è definito nel file di configurazione di Pinia, ma potrei sovrascriverlo
      await authStore.login(email.value, password.value);
      // Se l'utente è autenticato, reindirizza grazie al router
      if (authStore.isAuthenticated) {
        // Nota: c'è differenza tra route e router in Nuxt
        // Uno serve per la navigazione, l'altro per ottenere informazioni sulla route
        router.push("/dashboard");
      }
      // Se non è autenticato, mostra un messaggio di errore
    } catch (error) {
      console.error("Errore durante il login:", error);
    }
  };

  // Ritorno le variabili e la funzione che poi andro' a destrutturare nel componente
  return {
    email,
    password,
    login,
  };
};
