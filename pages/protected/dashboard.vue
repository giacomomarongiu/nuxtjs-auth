<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";

// Inizializza lo store di autenticazione
const authStore = useAuthStore();
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Welcome to Your Dashboard</h1>

    <div class="row">
      <!-- Card 1: User Info -->
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">User Information</h5>
            <p class="card-text">Email: {{ authStore.getEmail }}</p>
            <!-- Usa il getter -->
          </div>
        </div>
      </div>

      <!-- Card 2: Statistics -->
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Statistics</h5>
            <p class="card-text">Total Logins: 5</p>
            <p class="card-text">Last Login: October 15, 2024</p>
          </div>
        </div>
      </div>

      <!-- Card 3: Recent Activities -->
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Recent Activities</h5>
            <ul>
              <li>Logged in on October 15, 2024</li>
              <li>Changed password on October 10, 2024</li>
              <li>Updated profile on October 5, 2024</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
