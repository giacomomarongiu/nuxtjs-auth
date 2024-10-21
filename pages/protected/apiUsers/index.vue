<script lang="ts" setup>
// Importo il composable generico
import { onMounted } from "vue";
import { useCRUD } from "~/composables/useCRUD";
import type { User } from "~/types/APITypes"; // Definisco il tipo 'User' per tipizzare i dati

// Uso il composable generico per gestire gli utenti, passando l'URL in modo dinamico
// desctrutturando i dati necessari
const {
  items: users,
  isLoading,
  errorMessage,
  fetchItems,
} = useCRUD<User>("https://reqres.in/api/users");

// Quando la pagina è montata, richiamo la funzione per recuperare gli utenti
onMounted((): Promise<void> => {
  fetchItems(); // Fetch della lista utenti
});
</script>

<template>
  <div class="container">
    <h1 class="text-center my-5">Protected Data</h1>

    <!-- Aggiungo un pulsante per creare un nuovo utente -->
    <div class="text-center my-4">
      <NuxtLink to="/apiUsers/create" class="btn btn-success"
        >Create New User</NuxtLink
      >
    </div>

    <!-- Se i dati sono in caricamento, mostro un messaggio di attesa -->
    <div v-if="isLoading" class="text-center">
      <p>Loading...</p>
    </div>

    <!-- Se ci sono errori, li mostro all'utente -->
    <div v-else>
      <div v-if="errorMessage" class="alert alert-danger">
        <p>{{ errorMessage }}</p>
      </div>

      <!-- Se ho gli utenti, li mostro come card -->

      <div v-if="users && users.length" class="row">
        <div
          class="col-lg-4 col-md-6 mb-4"
          v-for="user in users"
          :key="user.id"
        >
          <!-- Link dinamico verso la pagina del singolo utente -->
          <NuxtLink :to="`/apiUsers/${user.id}`">
            <div class="card h-100">
              <img
                :src="user.avatar"
                class="card-img-top"
                :alt="user.first_name"
              />
              <div class="card-body">
                <h5 class="card-title">
                  {{ user.first_name }} {{ user.last_name }}
                </h5>
                <p class="card-text">{{ user.email }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Messaggio di fallback se non ci sono utenti -->
      <div v-else class="text-center">
        <p>No users available</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 400px;
  margin: 0 auto;
  transition: transform 0.2s ease-in-out; /* Animazione al passaggio del mouse */
}

.card:hover {
  transform: scale(1.05);
}
</style>
