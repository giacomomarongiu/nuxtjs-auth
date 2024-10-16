<template>
  <div class="d-flex flex-column min-vh-100">
    <!-- Header/Navbar -->
    <NavBar />

    <!-- Main content: NuxtPage -->
    <main class="flex-grow-1">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
/* Assicurati che il main prenda tutto lo spazio disponibile */
main {
  padding: 20px;
}
</style>
<script setup lang="ts">
import NavBar from "~/global-layouts/NavBar.vue";
import Footer from "~/global-layouts/Footer.vue";
</script>
