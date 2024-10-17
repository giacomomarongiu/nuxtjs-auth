<script lang="ts" setup>
// Importo il composable generico
import { onMounted } from "vue";
import { useCRUD } from "~/composables/useCRUD";
import type { User } from "~/types/APITypes"; // Definisco il tipo 'User' per tipizzare i dati
import { useRoute, useRouter } from "vue-router"; // Importo useRoute e useRouter per la navigazione

// Uso il composable per gestire l'eliminazione dell'utente
const { deleteItem, isLoading, errorMessage } = useCRUD<User>(
  "https://reqres.in/api/users",
);

// Recupero l'ID dell'utente dalla rotta
const route = useRoute();
const userId = route.params.id;
const router = useRouter();

// Funzione per eliminare l'utente
const deleteUser = async () => {
  try {
    await deleteItem(userId); // Elimina l'utente
    console.log("Utente eliminato con successo.");
    router.push("/apiUsers"); // Reindirizza alla lista degli utenti dopo l'eliminazione
  } catch (error) {
    console.error("Errore durante l'eliminazione dell'utente:", error);
  }
};

// Quando la pagina è montata, richiamo la funzione per eliminare l'utente
onMounted(() => {
  deleteUser(); // Esegue la funzione di eliminazione
});
</script>

<template>
  <div class="container">
    <h1 class="text-center my-5">Deleting User...</h1>

    <div v-if="isLoading" class="text-center">
      <p>Eliminando l'utente, attendere...</p>
    </div>

    <div v-if="errorMessage" class="alert alert-danger">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Stili personalizzati per la pagina di eliminazione */
</style>
