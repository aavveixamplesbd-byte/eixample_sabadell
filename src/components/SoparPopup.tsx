import React, { useState, useEffect, useCallback } from "react";

interface SoparPopupProps {
  lang?: "ca" | "es";
}

const SESSION_KEY = "sopar-popup-shown";

export default function SoparPopup({ lang = "ca" }: SoparPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const t = {
    ca: {
      reserveBtn: "Reserva ara!",
      closeLabel: "Tancar",
      imgAlt: "Sopar de Festa Major de l'Eixample 2026",
    },
    es: {
      reserveBtn: "¡Reserva ahora!",
      closeLabel: "Cerrar",
      imgAlt: "Cena de Fiesta Mayor de l'Eixample 2026",
    },
  }[lang];

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsOpen(true);
      // Trigger fade-in on next frame
      requestAnimationFrame(() => setIsVisible(true));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = useCallback(() => {
    setIsVisible(false);
    // Wait for fade-out transition before unmounting
    setTimeout(() => setIsOpen(false), 200);
  }, []);

  const handleReserve = useCallback(() => {
    close();
    // Small delay so the modal finishes closing before scrolling
    setTimeout(() => {
      const target = document.getElementById("sopar-form");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 250);
  }, [close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={close}
      />

      {/* Modal content */}
      <div
        className={`relative z-10 flex flex-col items-center max-w-md w-full transition-all duration-300 ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        {/* Close button */}
        <button
          onClick={close}
          className="absolute -top-3 -right-3 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors"
          aria-label={t.closeLabel}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "22px" }}
          >
            close
          </span>
        </button>

        {/* Poster image */}
        <img
          src="/sopar-festa-major.jpg"
          alt={t.imgAlt}
          className="w-full rounded-2xl shadow-2xl"
        />

        {/* Reserve CTA */}
        <button
          onClick={handleReserve}
          className="mt-4 bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-xl font-label-md text-label-md font-bold transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
            restaurant
          </span>
          {t.reserveBtn}
        </button>
      </div>
    </div>
  );
}
