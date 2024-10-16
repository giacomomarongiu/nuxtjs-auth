// Questo file definisce tipi destinati alla logica dell'applicazione,
// come ad esempio il tipo `Page` che rappresenta una pagina dell'applicazione.

export interface Page {
  path: string;
  file: string;
  meta?: {
    requiresAuth?: boolean;
    [key: string]: any;
  };
}

// Interfaccia per lo stato dell'autenticazione
export interface AuthState {
  token: string | null;
  user: { name: string; email: string } | null;
}

// Interfaccia per la risposta della chiamata API di login
export interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}
