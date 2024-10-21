// Questo composable gestisce le operazioni CRUD (Create, Read, Update, Delete) per un'entità generica
// Riceve un URL di base per le richieste HTTP e utilizza il token per autenticare le richieste dallo store di autenticazione di Pinia
// La tipizzazione è generica per rendere il composable più flessibile e riutilizzabile con i generici di TypeScript
import { ref } from "vue";

// Importo il mio store per l'autenticazione, dove gestisco il token
import { useAuthStore } from "~/stores/auth";

// Creo un composable generico per le CRUD
export const useCRUD = <T>(baseUrl: string) => {
  // Uso ref per i dati, così posso reagire ai cambiamenti in modo reattivo
  // Ho usato un TypeScript generic per rendere il composable più flessibile
  // Ho cercato di standardizzare quelle che sono le operazioni CRUD più comuni
  // Qui salvo i dati recuperati dalla richiesta
  const items = ref<T[]>([]);
  // Qui salvo i dettagli di un singolo elemento
  const item = ref<T | null>(null);
  // Variabile per gestire lo stato di caricamento e mostrare un loader
  const isLoading = ref<boolean>(true); // Gestisco lo stato di caricamento
  // Variabile per gestire i messaggi di errore
  const errorMessage = ref<string | null>(null); // Messaggi di errore in caso di problemi con le richieste
  // Recupero il token dallo store di autenticazione
  const authStore = useAuthStore(); // Recupero il token dallo store di autenticazione

  // Funzione asincrona per recuperare tutti gli elementi
  const fetchItems = async () => {
    // Inizio caricamento
    isLoading.value = true;
    //Utilizzo un try catch per gestire eventuali errori
    try {
      // Recupero il token dallo store di autenticazione gestito con Pinia
      const token = authStore.getToken;
      // Controllo se il token è presente
      if (token) {
        // Effettuo la richiesta passando l'URL in modo dinamico
        // $fetch è un'utility di Nuxt per fare richieste HTTP
        // A differenza di fetch, $fetch è più semplice e gestisce automaticamente il parsing dei dati
        // Rispetto da axios, $fetch è più leggero e integrato in Nuxt, ma meno flessibile
        // Con axios si possono gestire meglio le configurazioni e i tipi di richiesta

        // Assegno a response i dati recuperati dalla richiesta
        // Specifico che i dati sono un array di oggetti di tipo T
        const response = await $fetch<{ data: T[] }>(`${baseUrl}`, {
          // Grazie a headers, che è una proprietà di fetch, posso passare il token per autenticare la richiesta
          // Posso passare anche altri header come Content-Type, Accept, Language, ecc.
          headers: {
            //Bearer è uno schema di autenticazione che utilizza un token
            Authorization: `Bearer ${token}`, // Passo il token per autenticare la richiesta
          },
        });
        // Assegno i dati recuperati alla variabile reattiva items
        items.value = response.data; // Assegno i dati alla variabile reattiva
      } else {
        // Messaggio di errore se il token non è presente
        // In teoria non dovrebbe mai accadere, la rotta è protetta
        errorMessage.value = "Token non presente";
      }
      //utilizzo catch per gestire eventuali errori
    } catch (error) {
      // Messaggio di errore generico in caso di problemi
      errorMessage.value = error.message
        ? `Errore: ${error.message}`
        : "Errore nel recupero dei dati."; // Se qualcosa va storto, registro l'errore
      console.error("Dettagli dell'errore:", error); // Faccio anche un log dell'errore per ulteriori indagini
    } finally {
      // Utilizzo finally per assicurarmi che isLoading venga sempre settato a false
      isLoading.value = false;
    }
  };

  // Funzione per recuperare un singolo elemento per ID
  // NOTA:Valutare se è il caso di implementare un sistema di cache per evitare di fare richieste inutili
  // NOTA:Valutare se è il caso di implementare un meccanismo di Replay per ripetere le richieste fallite
  const fetchItemById = async (id: string | number) => {
    isLoading.value = true; // Inizio caricamento
    try {
      const token = authStore.getToken; // Recupero il token
      if (token) {
        // Faccio la richiesta passando l'ID in modo dinamico
        const response = await $fetch<{ data: T }>(`${baseUrl}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Passo il token per autenticare la richiesta
          },
        });
        item.value = response.data; // Assegno i dettagli dell'elemento alla variabile reattiva
      } else {
        errorMessage.value = "Token non presente"; // Gestisco il caso in cui non ci sia il token
      }
    } catch (error) {
      errorMessage.value = "Errore nel recupero dei dettagli."; // Registro l'errore in caso di problemi
    } finally {
      isLoading.value = false; // Fine caricamento
    }
  };

  // Funzione per creare un nuovo elemento
  // Nota: Partial è un tipo di TypeScript che rende tutte le proprietà di un oggetto opzionali
  // In questo modo posso passare solo alcune proprietà di un oggetto e non tutte
  // Ma ci basiamo sempre sul tipo T per garantire che le proprietà siano corrette e flessibili
  const createItem = async (newItem: Partial<T>) => {
    isLoading.value = true; // Inizio caricamento
    try {
      const token = authStore.getToken; // Recupero il token
      if (token) {
        // Faccio la richiesta POST per creare un nuovo elemento
        const response = await $fetch<{ data: T }>(`${baseUrl}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Passo il token per autenticare la richiesta
          },
          body: newItem, // Passo il nuovo elemento da creare
        });
        item.value = response.data; // Assegno i dati dell'elemento creato
      } else {
        errorMessage.value = "Token non presente"; // Messaggio di errore in assenza del token
      }
    } catch (error) {
      console.log(error);
      errorMessage.value = "Errore durante la creazione."; // Gestisco eventuali errori nella creazione
    } finally {
      isLoading.value = false; // Fine caricamento
      console.log("Creato");
      console.log(new Date().toLocaleString());
    }
  };

  // Funzione per aggiornare un elemento
  const updateItem = async (id: string | number, updatedItem: Partial<T>) => {
    isLoading.value = true; // Inizio caricamento
    try {
      const token = authStore.getToken; // Recupero il token
      if (token) {
        // Faccio la richiesta PUT per aggiornare l'elemento
        const response = await $fetch<{ data: T }>(`${baseUrl}/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // Passo il token per autenticare la richiesta
          },
          body: updatedItem, // Passo i dati aggiornati
        });
        item.value = response.data; // Aggiorno il dato in locale
      } else {
        errorMessage.value = "Token non presente"; // Gestisco il caso di assenza del token
      }
    } catch (error) {
      errorMessage.value = "Errore durante l'aggiornamento."; // Registro l'errore in caso di problemi
    } finally {
      isLoading.value = false; // Fine caricamento
      console.log("Aggiornato");
      console.log(new Date().toLocaleString());
    }
  };

  // Funzione per eliminare un elemento
  const deleteItem = async (id: string | number) => {
    isLoading.value = true; // Inizio caricamento
    try {
      const token = authStore.getToken; // Recupero il token
      if (token) {
        // Faccio la richiesta DELETE per rimuovere l'elemento
        await $fetch(`${baseUrl}/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Passo il token per autenticare la richiesta
          },
        });
      } else {
        errorMessage.value = "Token non presente"; // Gestisco il caso in cui non c'è il token
      }
    } catch (error) {
      errorMessage.value = "Errore durante l'eliminazione."; // Registro eventuali problemi nell'eliminazione
    } finally {
      isLoading.value = false; // Fine caricamento
      console.log("Eliminato");
      console.log(new Date().toLocaleString());
    }
  };

  // Ritorno tutte le variabili e funzioni per essere utilizzate nel componente
  return {
    items,
    item,
    isLoading,
    errorMessage,
    fetchItems,
    fetchItemById,
    createItem,
    updateItem,
    deleteItem,
  };
};
