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
  user: string | null; // Tipizzato come stringa o null se non utilizzato
  mail: string | null;
}

// Interfaccia per la risposta della chiamata API di login
export interface LoginResponse {
  token: string;
}

// Interfaccia per la prop di un componente modale di conferma
export interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}
