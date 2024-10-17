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
  router: {
    middleware: ["auth"], // Applica il middleware "auth" globalmente
  },
  // Aggiungo un hook per modificare le pagine generate
  hooks: {
    "pages:extend"(pages: Page[]) {
      // Utilizzo il composable per modificare le pagine
      const { modifyPages } = usePageModifiers();
      modifyPages(pages);
    },
  },
});
