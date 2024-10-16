<script setup lang="ts"></script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand" to="/">Login Test</NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/auth/login">Login</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/public/about">About</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// Il codice setup di questo componente può rimanere vuoto, non c'è logica specifica necessaria qui
</script>

<style scoped>
/* Aggiungi eventuali stili personalizzati qui */
</style>

<style scoped></style>
