// plugins/bootstrap.client.ts
import { defineNuxtPlugin } from "#app";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default defineNuxtPlugin(() => {
  // Non serve fare altro, carichiamo solo Bootstrap JS
});
// In questo caso, il plugin bootstrap.client.ts importa il file JS di Bootstrap, che verrà eseguito solo sul client.
