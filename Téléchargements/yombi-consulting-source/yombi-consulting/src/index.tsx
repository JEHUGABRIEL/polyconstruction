import "./index.css";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./i18n"; // Charge la configuration de traduction avant le rendu

// Point d'entrée de l'application React
// On vérifie que l'élément #root existe avant de monter l'application
const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<App />);
}
