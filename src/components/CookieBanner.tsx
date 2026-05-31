import React, { useState, useEffect } from "react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("cookie-consent");
      if (!consent) {
        // Show after a short delay for a premium entry animation feel
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cookie-consent", "accepted");
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 animate-fade-in-up">
      <div className="bg-surface/95 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 text-on-surface">
        <div className="flex gap-3 items-start">
          <div className="bg-primary/10 text-primary p-2 rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">cookie</span>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-headline-sm text-headline-sm font-bold text-primary">Ús de galetes</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Utilitzem només galetes tècniques necessàries per al funcionament bàsic de la web. No realitzem cap tipus de seguiment (tracking) ni recollim dades personals.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-outline-variant/20 pt-3">
          <button
            onClick={handleAccept}
            className="bg-primary hover:bg-primary-container text-white px-5 py-2 rounded-lg font-label-md text-label-md transition-all active:scale-[0.98] font-bold shadow-sm"
          >
            Acceptar
          </button>
        </div>
      </div>
    </div>
  );
}
