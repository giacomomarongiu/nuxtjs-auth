// Questo composable permette di gestire una modale di conferma per azioni come cancellazioni, aggiornamenti, ecc.
// Prende in input una funzione asincrona che rappresenta l'azione da confermare e un URL a cui reindirizzare l'utente dopo l'azione.
// La funzione restituisce variabili reactive per gestire lo stato della modale e la funzione confirmAction per confermare l'azione.

import { ref } from "vue";
import { useRouter } from "vue-router";

export function useConfirmation() {
  // Variabili reattive per gestire lo stato della modale
  const showModal = ref(false);
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);
  // Importo il router per poter reindirizzare l'utente dopo un'azione
  const router = useRouter();

  // Funzione generica per confermare un'azione (es. cancellazione, aggiornamento)
  const confirmAction = async (
    // Funzione asincrona che rappresenta l'azione da confermare
    // Può essere una cancellazione, un aggiornamento, ecc.
    //NOTA: da non confonder con la proprietà actions di Pinia che rappresenta le azioni dello store
    action: () => Promise<void>,
    // URL a cui reindirizzare l'utente dopo l'azione
    redirectUrl: string | null = null,
  ): Promise<void> => {
    // Mostro la modale
    showModal.value = true;
    //Uso try catch per gestire eventuali errori
    try {
      // Mostro il loader
      isLoading.value = true;
      // Eseguo l'azione passata come parametro (es. cancellazione)
      await action();
      //  Se l'azione va a buon fine, reindirizzo l'utente
      if (redirectUrl) {
        await router.push(redirectUrl); // Reindirizza se è fornito un URL
      }
    } catch (error) {
      errorMessage.value = (error as Error).message;
      console.error("Errore durante l'azione:", error);
    } finally {
      isLoading.value = false;
      showModal.value = false; // Chiudi la modale dopo l'operazione
    }
  };

  // Restituisco le variabili reactive e la funzione per confermare l'azione
  return {
    showModal,
    isLoading,
    errorMessage,
    confirmAction,
  };
}
