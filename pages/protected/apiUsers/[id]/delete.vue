<script lang="ts" setup>
// Importo il composable generico e il componente della modale
import { ref } from "vue";
import { useCRUD } from "~/composables/useCRUD";
import type { User } from "~/types/APITypes";
import { useRoute, useRouter } from "vue-router";
import ConfirmationModal from "~/components/ConfirmationModal.vue"; // Importo la modale

// Stato per la modale di conferma
const showModal = ref(false);

// Uso il composable per gestire l'eliminazione dell'utente
const { deleteItem, isLoading, errorMessage } = useCRUD<User>(
  "https://reqres.in/api/users",
);

// Recupero l'ID dell'utente dalla rotta
const route = useRoute();
const userId: string | undefined = route.params.id;
const router = useRouter();

// Funzione per eliminare l'utente
const confirmDeleteUser = async (): Promise<void> => {
  try {
    await deleteItem(userId); // Elimina l'utente
    router.push("/apiUsers"); // Reindirizza alla lista degli utenti dopo l'eliminazione
  } catch (error) {
    console.error("Errore durante l'eliminazione dell'utente:", error);
  }
};

// Mostra la modale all'apertura della pagina
onMounted(() => {
  showModal.value = true; // Mostra la modale
});

// Funzione per chiudere la modale senza eliminare l'utente
const cancelDelete = () => {
  router.push(`/apiUsers/${userId}`); // Torna alla pagina dell'utente
};
</script>

<template>
  <div class="container">
    <h1 class="text-center my-5">Delete User</h1>

    <!-- Se ci sono errori, li mostro all'utente -->
    <div v-if="errorMessage" class="alert alert-danger text-center">
      <p>{{ errorMessage }}</p>
    </div>

    <!-- Modale di conferma -->
    // Passo le props necessarie al componente della modale
    <ConfirmationModal
      :show="showModal"
      title="Conferma Eliminazione"
      message="Sei sicuro di voler eliminare questo utente? Questa operazione è irrevocabile."
      @confirm="confirmDeleteUser"
      @cancel="cancelDelete"
    />

    <!-- Se l'utente è in fase di eliminazione, mostro un messaggio di attesa -->
    <div v-if="isLoading" class="text-center">
      <p>Eliminando l'utente, attendere...</p>
    </div>
  </div>
</template>
