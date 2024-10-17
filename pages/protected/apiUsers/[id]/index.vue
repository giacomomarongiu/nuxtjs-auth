<script lang="ts" setup>
// Importo il composable generico
import { onMounted } from "vue";
import { useCRUD } from "~/composables/useCRUD";
import type { User } from "~/types/APITypes"; // Definisco il tipo 'User' per tipizzare i dati
import { useRoute, useRouter } from "vue-router"; // Importo useRoute per accedere ai parametri della rotta e useRouter per i redirect

// Uso il composable per recuperare i dettagli di un singolo utente
const {
  item: user,
  isLoading,
  errorMessage,
  fetchItemById,
} = useCRUD<User>("https://reqres.in/api/users");

// Recupero l'ID dell'utente dalla rotta
const route = useRoute(); // Uso useRoute per accedere ai parametri della rotta
const userId: string | undefined = route.params.id; // Ottengo l'ID dell'utente
const router = useRouter(); // Uso useRouter per gestire il redirect

// Quando la pagina è montata, richiamo la funzione per recuperare i dettagli dell'utente
onMounted(() => {
  fetchItemById(userId); // Fetch del singolo utente
});

// Funzione per gestire l'eliminazione dell'utente
const deleteUser = (): void => {
  router.push(`/apiUsers/${userId}/delete`); // Reindirizza alla pagina di eliminazione
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
        <button @click="deleteUser" class="btn btn-danger">Delete User</button>
      </div>

      <!-- Pulsante per tornare alla lista degli utenti -->
      <div class="text-center mt-4">
        <NuxtLink to="/apiUsers" class="btn btn-primary"
          >Back to Users</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 400px;
  margin: 0 auto;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
