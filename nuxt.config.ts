import { resolve } from "path";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  plugins: ["~/plugins/pinia"],
  css: ["bootstrap/dist/css/bootstrap.css"],
  router: {
    middleware: ["auth"], // Applica il middleware "auth" globalmente
  },
  // Aggiungo un hook per modificare le pagine generate
  hooks: {
    "pages:extend"(pages) {
      // Itera su tutte le pagine
      pages.forEach((page) => {
        // Rimuovo "public" e "private" dagli URL
        page.path = page.path
          .replace("/public", "")
          .replace("/protected", "")
          .replace("/auth", "");

        // Aggiungi `requiresAuth: true` alle pagine in "protected
        if (page.file.includes("/protected/")) {
          page.meta = page.meta || {};
          // requiresAuth è un flag che il middleware "auth" utilizza per controllare l'autenticazione
          page.meta.requiresAuth = true; // Aggiungi il flag di autenticazione
        }
      });
    },
  },
});
