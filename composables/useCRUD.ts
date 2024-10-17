// ~/composables/useCRUD.ts
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth"; // Uso il mio store per l'autenticazione, dove gestisco il token

// Creo un composable generico per le CRUD
export const useCRUD = <T>(baseUrl: string) => {
  // Uso ref per i dati, così posso reagire ai cambiamenti in modo reattivo
  const items = ref<T[]>([]); // Array che conterrà tutti gli elementi
  const item = ref<T | null>(null); // Singolo elemento, utile per fetch di un singolo dato
  const isLoading = ref<boolean>(true); // Gestisco lo stato di caricamento
  const errorMessage = ref<string | null>(null); // Messaggi di errore in caso di problemi con le richieste

  const authStore = useAuthStore(); // Recupero il token dallo store di autenticazione

  // Funzione per recuperare una lista di elementi
  const fetchItems = async () => {
    isLoading.value = true; // Inizio caricamento
    try {
      const token = authStore.getToken; // Recupero il token
      if (token) {
        // Effettuo la richiesta passando l'URL in modo dinamico
        const response = await $fetch<{ data: T[] }>(`${baseUrl}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Passo il token per autenticare la richiesta
          },
        });
        items.value = response.data; // Assegno i dati alla variabile reattiva
      } else {
        errorMessage.value = "Token non presente"; // Messaggio di errore se il token non è presente
      }
    } catch (error) {
      errorMessage.value = "Errore nel recupero dei dati."; // Se qualcosa va storto, registro l'errore
    } finally {
      isLoading.value = false; // Fine caricamento
    }
  };

  // Funzione per recuperare un singolo elemento per ID
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
