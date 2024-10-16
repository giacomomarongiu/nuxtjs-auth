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
