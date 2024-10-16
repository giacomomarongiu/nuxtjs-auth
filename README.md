# Nuxt.js Authentication Project

Questo progetto è una Single Page Application (SPA) costruita con **Nuxt.js 3** e **TypeScript**. Include l'integrazione di **Pinia** per la gestione dello stato, **Bootstrap** per lo stile e un sistema di autenticazione basato su **JWT**. Le rotte protette sono gestite tramite un middleware globale che verifica se l'utente è autenticato, con reindirizzamento a una pagina di login se l'utente non è loggato.

## Processo di sviluppo
- Lavorato su un progetto Nuxt.js con TypeScript.
- Integrato Pinia per la gestione dello stato.
- Utilizzato Bootstrap per lo stile.
- Implementato un sistema di autenticazione basato su JWT.
- Configurato un middleware globale per gestire le rotte protette.
- Creato un composable per modificare le pagine generate.
- Rimosso parti specifiche degli URL e aggiunto metadati per le pagine protette.
- Configurato il file nuxt.config.ts per applicare il middleware di autenticazione globalmente e utilizzare il composable per modificare le pagine