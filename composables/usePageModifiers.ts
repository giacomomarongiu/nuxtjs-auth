// Questo composable modifica le pagine in base alla loro posizione nel progetto
// Nuxt.js legge le pagine dalla cartella "pages" e le trasforma in un array di oggetti
// Questo fa si che nell'url di una pagina ci siano delle stringhe che non vogliamo
// Ad esempio, se una pagina è in "pages/public", l'url sarà "/public/nome-pagina"
// Questo composable rimuove "public" dall'url rendeendo l'url "/nome-pagina"
import type { Page } from "~/types/logicTypes";
export function usePageModifiers() {
  // @ts-ignore
  function modifyPages(pages: Page[]) {
    pages.forEach((page) => {
      // Rimuovo "public" e "private" dagli URL
      page.path = page.path
        .replace("/public", "")
        .replace("/protected", "")
        .replace("/auth", "");

      // Aggiungi `requiresAuth: true` alle pagine in "protected"
      if (page.file.includes("/protected/")) {
        page.meta = page.meta || {};
        page.meta.requiresAuth = true;
      }
    });
  }

  return {
    modifyPages,
  };
}
