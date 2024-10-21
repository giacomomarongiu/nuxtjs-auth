<script lang="ts" setup>
// Importo i composables e utility
import { ref, onMounted } from "vue";
import { useCRUD } from "~/composables/useCRUD";
import type { User } from "~/types/APITypes";
import { useRoute, useRouter } from "vue-router";

// Inizializzo il router e la route per accedere all'ID
const route = useRoute();
const router = useRouter();
const userId: string | undefined = route.params.id;

// Uso il composable generico per ottenere e aggiornare i dati dell'utente
const {
  item: user,
  fetchItemById,
  updateItem,
  isLoading,
  errorMessage,
} = useCRUD<User>("https://reqres.in/api/users");

// Recupero i dettagli dell'utente quando la pagina è montata
onMounted(() => {
  fetchItemById(userId); // Fetch dell'utente esistente
});

// Funzione per aggiornare i dettagli dell'utente
const updateUser = async (): Promise<void> => {
  if (user.value) {
    // Assicurati che i dati dell'utente siano disponibili
    await updateItem(userId, user.value); // Aggiorno l'utente con i nuovi dati
    await router.push(`/apiUsers/${userId}`); // Reindirizzo alla pagina del singolo utente
  }
};
</script>

<template>
  <div class="container">
    <h1 class="text-center my-5">Edit User</h1>

    <div v-if="isLoading" class="text-center">
      <p>Loading user details...</p>
    </div>

    <div v-else>
      <div v-if="errorMessage" class="alert alert-danger">
        <p>{{ errorMessage }}</p>
      </div>

      <!-- Controllo che i dati dell'utente siano disponibili prima di mostrare il form -->
      <div v-if="user">
        <form @submit.prevent="updateUser">
          <div class="mb-3">
            <label for="first_name" class="form-label">First Name</label>
            <input
              v-model="user.first_name"
              type="text"
              id="first_name"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="last_name" class="form-label">Last Name</label>
            <input
              v-model="user.last_name"
              type="text"
              id="last_name"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              v-model="user.email"
              type="email"
              id="email"
              class="form-control"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Update User</button>
        </form>
      </div>

      <div v-else class="text-center">
        <p>User data is not available yet</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Personalizzazione dello stile per il form */
</style>
