// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  plugins: ["~/plugins/pinia"],
  css: ["bootstrap/dist/css/bootstrap.css"],
  router: {
    middleware: ["auth"], // Applica il middleware "auth" globalmente
  },
});
