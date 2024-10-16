<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";

// Definisci un middleware specifico per la pagina
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
            <p class="card-text">Username: JohnDoe</p>
            <p class="card-text">Email: johndoe@example.com</p>
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

    <!-- Additional content could go here -->
    <div class="row mt-4">
      <div class="col-12">
        <h2>Quick Links</h2>
        <ul class="list-group"></ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Aggiungi qualche stile personalizzato per migliorare l'aspetto */
.card {
  border-radius: 10px;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.list-group-item {
  cursor: pointer;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>
