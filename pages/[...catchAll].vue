<script setup>
//[...catchAll] è un parametro dinamico che corrisponde
// a qualsiasi URL che non corrisponde a una pagina esistente.
// E' utile per gestire le pagine 404.
definePageMeta({
  title: "404 Not Found",
});
</script>

<template>
  <div>
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <NuxtLink to="/">Return to Home</NuxtLink>
  </div>
</template>
