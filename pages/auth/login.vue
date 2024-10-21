<script lang="ts" setup>
// Importa il composable useLogin
import { useLogin } from "~/composables/loginLogic/useLogin";

// Inizializza il composable ccn i metodi e le variabili necessarie
const { email, password, login } = useLogin();

// Applica il middleware per bloccare gli utenti autenticati
// definePageMeta è un metodo di Nuxt che permette di definire i metadati della pagina
// Ad esempio, oltre al middleware, è possibile definire:
// title, description, layout, head, validate
definePageMeta({
  middleware: "guest",
});
</script>

<template>
  <div class="container w-50 my-5">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
        <input v-model="email" placeholder="Email" class="form-control" />
      </div>
      <div class="mb-3">
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>
