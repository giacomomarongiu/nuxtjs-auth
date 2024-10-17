<script lang="ts" setup>
// Importo i composables
import { ref } from "vue";
import { useCRUD } from "~/composables/useCRUD";
import type { User } from "~/types/APITypes"; // Definisco il tipo 'User' per tipizzare i dati
import { useRouter } from "vue-router"; // Router per il redirect

// Definisco i dati del nuovo utente
const newUser = ref<Partial<User>>({
  first_name: "",
  last_name: "",
  email: "",
});

// Stato di caricamento e messaggi di errore
const isLoading = ref(false); // Imposto isLoading su false di default
const errorMessage = ref<string | null>(null); // Messaggio di errore se necessario

// Uso il composable generico per la creazione
const { createItem } = useCRUD<User>("https://reqres.in/api/users");

const router = useRouter(); // Inizializzo il router per il redirect

// Funzione per gestire la creazione di un nuovo utente
const createUser = async () => {
  isLoading.value = true; // Inizio il caricamento
  try {
    await createItem(newUser.value); // Chiamo la funzione per creare il nuovo utente
    await router.push("/apiUsers"); // Reindirizza alla lista degli utenti dopo la creazione
  } catch (error) {
    errorMessage.value = "Error while creating the user"; // Gestisco l'errore
  } finally {
    isLoading.value = false; // Fine caricamento
  }
};
</script>

<template>
  <div class="container">
    <h1 class="text-center my-5">Create New User</h1>

    <!-- Mostro il caricamento solo durante la creazione -->
    <div v-if="isLoading" class="text-center">
      <p>Creating user...</p>
    </div>

    <div v-else>
      <!-- Mostro eventuali errori -->
      <div v-if="errorMessage" class="alert alert-danger">
        <p>{{ errorMessage }}</p>
      </div>

      <!-- Form per creare il nuovo utente -->
      <form @submit.prevent="createUser">
        <div class="mb-3">
          <label for="first_name" class="form-label">First Name</label>
          <input
            v-model="newUser.first_name"
            type="text"
            id="first_name"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="last_name" class="form-label">Last Name</label>
          <input
            v-model="newUser.last_name"
            type="text"
            id="last_name"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            v-model="newUser.email"
            type="email"
            id="email"
            class="form-control"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Create User</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Personalizzazione dello stile per il form */
</style>
