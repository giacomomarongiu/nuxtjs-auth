<script lang="ts" setup>
// Importo i composables e utilità
import { ref } from "vue";
import { useCRUD } from "~/composables/useCRUD";
import type { User } from "~/types/APITypes";
import { useRoute, useRouter } from "vue-router";

// Stato per la modale di conferma
const showModal = ref(false);

// Uso il composable per recuperare i dettagli di un singolo utente
const {
  item: user,
  isLoading,
  errorMessage,
  fetchItemById,
  deleteItem,
} = useCRUD<User>("https://reqres.in/api/users");

// Recupero l'ID dell'utente dalla rotta
const route = useRoute();
const userId: string | undefined = route.params.id;
const router = useRouter();

// Quando la pagina è montata, richiamo la funzione per recuperare i dettagli dell'utente
onMounted(() => {
  fetchItemById(userId); // Fetch del singolo utente
});

// Funzione per gestire l'eliminazione dell'utente
const confirmDeleteUser = async (): Promise<void> => {
  try {
    await deleteItem(userId); // Elimina l'utente
    router.push("/apiUsers"); // Reindirizza alla lista degli utenti dopo l'eliminazione
  } catch (error) {
    console.error("Errore durante l'eliminazione dell'utente:", error);
  }
};

// Funzione per gestire la modifica dell'utente
const editUser = (): void => {
  router.push(`/apiUsers/${userId}/edit`); // Reindirizza alla pagina di modifica
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
        <NuxtLink to="/apiUsers" class="btn btn-primary"
          >Back to Users</NuxtLink
        >
      </div>

      <!-- Modale di conferma per l'eliminazione -->
      <div
        v-if="showModal"
        class="modal fade show"
        tabindex="-1"
        style="display: block; background-color: rgba(0, 0, 0, 0.5)"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Conferma Eliminazione</h5>
              <button
                type="button"
                class="btn-close"
                @click="showModal = false"
              ></button>
            </div>
            <div class="modal-body">
              <p>
                Sei sicuro di voler eliminare questo utente? Questa azione è
                irreversibile.
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="showModal = false"
              >
                Annulla
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="confirmDeleteUser"
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 400px;
  margin: 0 auto;
}

.modal-content {
  background-color: #fff;
  border-radius: 0.5rem;
}

.modal-header {
  border-bottom: none;
}

.modal-footer {
  border-top: none;
}
</style>
