<template>
  <div class="d-flex flex-column min-vh-100">
    <!-- Header/Navbar -->
    <NavBar />

    <!-- Main content: NuxtPage con transizione -->
    <main class="flex-grow-1">
      <transition name="fade" mode="out-in">
        <NuxtPage />
      </transition>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>

<script setup lang="ts">
import NavBar from "~/layouts/AppHeader.vue";
import Footer from "~/layouts/AppFooter.vue";
</script>
