# Nuxt.js Authentication Project

Questo progetto è una Single Page Application (SPA) costruita con **Nuxt.js 3** e **TypeScript**. Include l'integrazione di **Pinia** per la gestione dello stato, **Bootstrap** per lo stile e un sistema di autenticazione basato su **JWT**. Le rotte protette sono gestite tramite un middleware globale che verifica se l'utente è autenticato, con reindirizzamento a una pagina di login se l'utente non è loggato.

## Processo di sviluppo
- Inizializzazione del progetto con `npx create-nuxt-app`
- Installazione di **Pinia** per la gestione dello stato
- Installazione di **Bootstrap** per lo stile
- Definizione directory del progetto
- Creazione di componenti e pagine
- Creazione di un servizio per la gestione dello stato dell'utente
- Creazione di un middleware globale per le rotte protette
- Hooks per la gestione dell'autenticazione e la pulizia del Url

