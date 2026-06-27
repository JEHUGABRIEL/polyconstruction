import { useEffect, useRef } from "react";

/**
 * useFocusTrap — Piège le focus clavier (Tab / Shift+Tab) à l'intérieur
 * de l'élément désigné par la ref retournée.
 *
 * @param {boolean} active  Active ou désactive le piège
 * @returns {React.RefObject}  Ref à attacher au conteneur du modal
 */
export default function useFocusTrap(active) {
  const ref = useRef(null);

  useEffect(() => {
    if (!active || !ref.current) return;

    const container = ref.current;

    // Récupère tous les éléments focusables dans le container
    const getFocusable = () => {
      const selectors = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'textarea:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ];
      return container.querySelectorAll(selectors.join(", "));
    };

    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift+Tab : si le focus est sur le premier élément, va au dernier
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab : si le focus est sur le dernier élément, va au premier
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  return ref;
}
