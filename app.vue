<template>
  <div class="d-flex flex-column min-vh-100">
    <!-- Header/Navbar -->
    <NavBar />

    <!-- Main content: NuxtPage con transizione -->
    <transition name="fade" mode="out-in">
      <main class="flex-grow-1">
        <NuxtPage />
      </main>
    </transition>
    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
/* Assicurati che il main prenda tutto lo spazio disponibile */
main {
  padding: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>

<script setup lang="ts">
import NavBar from "~/global-layouts/AppHeader.vue";
import Footer from "~/global-layouts/AppFooter.vue";
</script>
