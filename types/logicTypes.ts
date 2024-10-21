// Questo file definisce tipi destinati alla logica dell'applicazione,

// Interfaccia per rappresentare una pagina dell'applicazione di Nuxt.js
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
  user: string | null; // Tipizzato come stringa o null se non utilizzato
  mail: string | null;
}

// Interfaccia per la risposta della chiamata API di login
export interface LoginResponse {
  token: string;
}

// Interfaccia per la prop di un componente ConfirmationModal
export interface ConfirmationModalProps {
  // Titolo e messaggio del modale
  title: string;
  message: string;
  // Funzioni per gestire la conferma o l'annullamento dell'azione
  onConfirm: () => void;
  onCancel: () => void;
}
