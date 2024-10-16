<script setup lang="ts"></script>

<template>
  <footer class="bg-light text-center text-lg-start">
    <div class="container p-4">
      <div class="row">
        <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
          <h5 class="text-uppercase">Login Test</h5>
          <p>
            This is a generic footer for the Login Test application. You can add
            any content here, like links, contact info, or social media.
          </p>
        </div>

        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase">Links</h5>
          <ul class="list-unstyled mb-0">
            <li>
              <NuxtLink class="text-dark" to="/">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink class="text-dark" to="/login">Login</NuxtLink>
            </li>
            <li>
              <NuxtLink class="text-dark" to="/about">About</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase">Contact</h5>
          <ul class="list-unstyled mb-0">
            <li>Email: contact@logintest.com</li>
            <li>Phone: +123 456 7890</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="text-center p-3 bg-dark text-white">
      © 2024 Login Test - All Rights Reserved
    </div>
  </footer>
</template>

<style scoped></style>
