<!-- Questa pagina mostra i dettagli di un singolo utente,
permettendo all'utente di modificarlo o eliminarlo.
Tutto viene gestito tramite la compoable CRUD.
I dati dell'utente vengono recuperati tramite una chiamata API
e l'ID dell'utente viene recuperato dalla rotta.
L'editUser funzione reindirizza l'utente alla pagina di modifica.
La cancellazione dell'utente viene gestita con una modale
 di conferma importata come componente.
La lofica di eliminazione è gestita dal composable di conferma.
-->

<script lang="ts" setup>
// Importo i composables e utilità
import { ref } from "vue";
import { useCRUD } from "~/composables/useCRUD"; // Composable CRUD generico
import { useConfirmation } from "~/composables/useConfirmationModal"; // Composable per la conferma
import type { User } from "~/types/APITypes";
import { useRoute, useRouter } from "vue-router";
import ConfirmationModal from "~/components/layouts/ConfirmationModal.vue"; // Importo la modale

// Uso il composable CRUD per recuperare i dettagli di un singolo utente
const {
  item: user,
  isLoading,
  errorMessage,
  fetchItemById,
  deleteItem,
} = useCRUD<User>("https://reqres.in/api/users");

// Uso il composable di conferma per gestire la conferma di eliminazione
const {
  showModal,
  confirmAction,
  isLoading: isActionLoading,
  errorMessage: actionErrorMessage,
} = useConfirmation();

// Recupero l'ID dell'utente dalla rotta
const route = useRoute();
const userId: string | undefined = route.params.id;
// Importo il router per la navigazione
// Mi serve per reindirizzare l'utente alla pagina di modifica
const router = useRouter();

// Quando la pagina è montata, richiamo la funzione per recuperare i dettagli dell'utente
// Faccio un'altra chiamata per recuperare i dettagli dell'utente, non è detto che siano già stati caricati con la lista
onMounted(() => {
  fetchItemById(userId); // Fetch del singolo utente
});

// Funzione per gestire la modifica dell'utente
const editUser = (): void => {
  router.push(`/apiUsers/${userId}/edit`); // Reindirizza alla pagina di modifica
};

// Funzione per eliminare l'utente con conferma
const confirmDeleteUser = () => {
  confirmAction(() => deleteItem(userId), "/apiUsers"); // Conferma e azione di eliminazione
};
</script>

<template>
  <div class="container">
    <h1 class="text-center my-5">User Details</h1>

    <!-- Se i dati sono in caricamento, mostro un messaggio di attesa -->
    <div v-if="isLoading" class="text-center">
      <p>Loading user details...</p>
    </div>

    <!-- Se ci sono errori, li mostro all'utente -->
    <div v-else>
      <div v-if="errorMessage" class="alert alert-danger">
        <p>{{ errorMessage }}</p>
      </div>

      <!-- Mostro i dettagli dell'utente in una card -->
      <div v-if="user" class="card mx-auto" style="max-width: 400px">
        <img :src="user.avatar" class="card-img-top" :alt="user.first_name" />
        <div class="card-body">
          <h5 class="card-title">{{ user.first_name }} {{ user.last_name }}</h5>
          <p class="card-text">{{ user.email }}</p>
        </div>
      </div>

      <!-- Pulsanti per modificare o eliminare l'utente -->
      <div class="text-center mt-4">
        <button @click="editUser" class="btn btn-warning me-2">
          Edit User
        </button>
        <button @click="showModal = true" class="btn btn-danger">
          Delete User
        </button>
      </div>

      <!-- Pulsante per tornare alla lista degli utenti -->
      <div class="text-center mt-4">
        <NuxtLink to="/apiUsers" class="btn btn-primary">
          Back to Users
        </NuxtLink>
      </div>

      <!-- Modale di conferma per l'eliminazione dell'utente -->
      <ConfirmationModal
        v-if="showModal"
        title="Conferma Eliminazione"
        message="Sei sicuro di voler eliminare questo utente? Questa azione è irreversibile."
        @confirm="confirmDeleteUser"
        @cancel="showModal = false"
      />

      <!-- Se ci sono errori durante l'azione di conferma, li mostro -->
      <div
        v-if="actionErrorMessage"
        class="alert alert-danger text-center mt-4"
      >
        <p>{{ actionErrorMessage }}</p>
      </div>

      <!-- Se l'azione è in corso, mostro un messaggio di attesa -->
      <div v-if="isActionLoading" class="text-center mt-4">
        <p>Eliminando l'utente, attendere...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 400px;
  margin: 0 auto;
}
</style>
