<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
</script>

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

      <!-- Mostra il menu di navigazione basato sullo stato di autenticazione solo lato client -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <!-- Controlla l'autenticazione solo lato client -->

          <template v-if="authStore.isAuthenticated">
            <!-- Menu per utenti autenticati -->
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/dashboard">Dashboard</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/settings">Settings</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/user/profile">Profile</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/apiUsers">Products</NuxtLink>
            </li>
            <li class="nav-item">
              <button class="btn btn-link nav-link" @click="authStore.logout()">
                Logout
              </button>
            </li>
          </template>
          <template v-else>
            <!-- Menu pubblico -->
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/login">Login</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/about">About</NuxtLink>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
