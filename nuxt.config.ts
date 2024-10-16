import { usePageModifiers } from "./composables/usePageModifiers";
import type { Page } from "./types/logicTypes";

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
    "pages:extend"(pages: Page[]) {
      // Utilizzo il composable per modificare le pagine
      const { modifyPages } = usePageModifiers();
      modifyPages(pages);
    },
  },
});
