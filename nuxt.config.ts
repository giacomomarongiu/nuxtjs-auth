import { usePageModifiers } from "./composables/usePageModifiers";
import type { Page } from "./types/logicTypes";

export default defineNuxtConfig({
  ssr: false, // Disattiva il rendering lato server
  target: "static", // Se è un'app interna, questa opzione va bene
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  plugins: [
    "~/plugins/pinia",
    { src: "~/plugins/bootstrap.client.ts", mode: "client" }, // Importa Bootstrap JS solo sul client
  ],
  css: ["bootstrap/dist/css/bootstrap.css"],
  // Middleware in Nuxt.js sono funzioni che vengono eseguite prima di caricare una pagina
  // In questo caso, il middleware "auth" verifica se l'utente è loggato
  // Laravel utilizza i middleware per fare la stessa cosa, filtrando le richieste HTTP
  router: {
    middleware: ["auth"], // Applica il middleware "auth" globalmente
  },
  // Gli hooks sono funzioni che vengono eseguite in determinati momenti del ciclo di vita di Nuxt.js
  // In questo caso, quando le pagine vengono estese, durante la build, eseguo il composable
  // Ci sono molti hooks, come "components:extend", "build:extend", "render:extend" e molti altri
  // Un hook prende un argomento, che è un oggetto con delle proprietà
  // In questo caso, l'oggetto ha una proprietà "pages" che è un array di oggetti
  // All'interno di ogni oggetto c'è la proprietà "path" che rappresenta l'url della pagina
  // Il composable modifica l'url di ogni pagina, rimuovendo "public", "protected" e "auth"
  hooks: {
    "pages:extend"(pages: Page[]) {
      // Utilizzo il composable per modificare le pagine
      const { modifyPages } = usePageModifiers();
      modifyPages(pages);
    },
  },
});
