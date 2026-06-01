import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const [lang, setLang] = useState<"ca" | "es">("ca");

  // Contact Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      setCurrentPath(path);
      const cleanPath = path.replace(/\/$/, "");
      if (cleanPath === "/admin" || cleanPath === "/es/admin") {
        const savedLang = localStorage.getItem("admin_lang") as "ca" | "es";
        if (savedLang) {
          setLang(savedLang);
          return;
        }
      }
      if (path.startsWith("/es") || path.startsWith("/es/")) {
        setLang("es");
      } else {
        setLang("ca");
      }
    }
  }, []);

  const handleLanguageChange = (newLang: "ca" | "es") => {
    if (typeof window !== "undefined") {
      if ((window as any).alternateLangUrl) {
        window.location.href = (window as any).alternateLangUrl;
        return;
      }
      const path = window.location.pathname;
      const cleanPath = path.replace(/\/$/, "");
      
      // Admin page is bilingual and handles both languages inline
      if (cleanPath === "/admin" || cleanPath === "/es/admin") {
        setLang(newLang);
        localStorage.setItem("admin_lang", newLang);
        window.dispatchEvent(new CustomEvent("admin-lang-change", { detail: newLang }));
        return;
      }

      if (newLang === "es") {
        if (!path.startsWith("/es")) {
          // If on home "/", redirect to "/es", otherwise "/es/page"
          window.location.href = "/es" + (path === "/" ? "" : path);
        }
      } else {
        if (path.startsWith("/es")) {
          // Remove "/es" prefix. If it becomes empty, redirect to "/"
          const cleanPathNoPrefix = path.replace(/^\/es/, "") || "/";
          window.location.href = cleanPathNoPrefix;
        }
      }
    }
  };

  const t = {
    ca: {
      brand: "Eixample Sabadell",
      home: "Inici",
      history: "Història",      news: "Notícies",
      whoWeAre: "Qui som",
      contact: "Contacte",
      joinUs: "Fes-te Soci",
      subtitle: "El cor industrial de Sabadell",
      neighborhoodAssoc: "Associació de Veïns",
      contactHeader: "Contacta amb nosaltres",
      formName: "Nom complet",
      formNamePlaceholder: "El teu nom",
      formEmail: "Correu electrònic",
      formEmailPlaceholder: "nom@exemple.com",
      formMessage: "Missatge",
      formMessagePlaceholder: "Com et podem ajudar?",
      formSubmit: "Enviar missatge",
      successTitle: "Missatge Enviat!",
      successBody: "Gràcies per posar-te en contacte. Et respondrem el més aviat possible.",
      closeBtn: "Tancar"
    },
    es: {
      brand: "Eixample Sabadell",
      home: "Inicio",
      history: "Historia",
      news: "Noticias",
      whoWeAre: "Quiénes somos",
      contact: "Contacto",
      joinUs: "Hazte Socio",
      subtitle: "El corazón industrial de Sabadell",
      neighborhoodAssoc: "Asociación de Vecinos",
      contactHeader: "Contacto con nosotros",
      formName: "Nombre completo",
      formNamePlaceholder: "Tu nombre",
      formEmail: "Correo electrónico",
      formEmailPlaceholder: "nombre@ejemplo.com",
      formMessage: "Mensaje",
      formMessagePlaceholder: "¿Cómo te podemos ayudar?",
      formSubmit: "Enviar mensaje",
      successTitle: "¡Mensaje Enviado!",
      successBody: "Gracias por ponerte en contacto. Te responderemos lo antes posible.",
      closeBtn: "Cerrar"
    }
  }[lang];

  const prefix = lang === "es" ? "/es" : "";

  const links = [
    { label: t.home, icon: "home", href: prefix || "/" },
    { label: t.history, icon: "factory", href: `${prefix}/historia` },
    { label: t.news, icon: "newspaper", href: `${prefix}/noticies` },
    { label: t.whoWeAre, icon: "groups", href: `${prefix}/qui-som` },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
      setIsContactOpen(false);
    }, 2000);
  };

  const isActive = (href: string) => {
    const cleanPath = currentPath.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
    const cleanHref = href.replace(/\/$/, "") || "/";
    return cleanPath === cleanHref;
  };

  return (
    <>
      {/* SVG Filters for colorizing logo.png dynamically without bounds overflow */}
      <svg className="absolute w-0 h-0 pointer-events-none" style={{ visibility: "hidden" }} aria-hidden="true">
        <defs>
          <filter id="colorize-mint" x="0" y="0" width="100%" height="100%">
            <feColorMatrix type="matrix" values="
              0 0 0 0 0.215
              0 0 0 0 0.392
              0 0 0 0 0.365
              -1 0 0 0 1
            " result="colorized" />
            <feComposite operator="in" in="colorized" in2="SourceGraphic" />
          </filter>
          <filter id="colorize-white" x="0" y="0" width="100%" height="100%">
            <feColorMatrix type="matrix" values="
              0 0 0 0 1
              0 0 0 0 1
              0 0 0 0 1
              -1 0 0 0 1
            " result="colorized" />
            <feComposite operator="in" in="colorized" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      {/* Responsive Header */}
      <header className="sticky top-0 bg-surface/90 backdrop-blur-md z-40 border-b border-surface-variant/50 w-full transition-all duration-300">
        <div className="flex justify-between items-center py-2 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto w-full">
          {/* Logo / Brand */}
          <a href={prefix || "/"} className="block">
            <img 
              src="/logo.png" 
              alt="Eixample Sabadell" 
              className="h-16 sm:h-20 md:h-24 w-auto object-contain" 
              style={{ filter: "url(#colorize-mint)" }}
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-x-8">
            {links.map((link, idx) => {
              const active = isActive(link.href);
              return (
                <a
                  key={idx}
                  href={link.href}
                  className={`font-label-md text-label-md transition-colors relative py-2 group ${
                    active ? "text-primary font-bold" : "text-secondary hover:text-primary"
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                    active ? "w-full" : "w-0"
                  }`}></span>
                </a>
              );
            })}
            {/* Desktop Contact Trigger */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="font-label-md text-label-md text-secondary hover:text-primary transition-colors relative py-2 group"
            >
              {t.contact}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>

          {/* Desktop CTA Button & Language Switcher */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-surface-container border border-outline-variant/30 rounded-lg p-1">
              <button
                onClick={() => handleLanguageChange("ca")}
                className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${
                  lang === "ca" ? "bg-primary text-white shadow-sm" : "text-secondary hover:text-primary"
                }`}
              >
                CA
              </button>
              <button
                onClick={() => handleLanguageChange("es")}
                className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${
                  lang === "es" ? "bg-primary text-white shadow-sm" : "text-secondary hover:text-primary"
                }`}
              >
                ES
              </button>
            </div>

            <button 
              onClick={() => window.dispatchEvent(new CustomEvent("open-join-modal"))}
              className="bg-primary hover:bg-primary-container text-white font-label-md text-label-md px-6 py-2.5 rounded-lg active:scale-95 transition-all shadow-sm"
            >
              {t.joinUs}
            </button>
          </div>

          {/* Mobile Menu Button & Mobile Switcher */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Mobile quick language toggle */}
            <button
              onClick={() => handleLanguageChange(lang === "ca" ? "es" : "ca")}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-outline-variant/40 text-secondary"
            >
              {lang === "ca" ? "ES" : "CA"}
            </button>
            <button
              className="p-2 text-primary hover:bg-primary/5 rounded-full transition-all active:scale-95"
              onClick={() => setIsOpen(true)}
              aria-label="Obrir menú"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                menu
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col transition-all duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: "rgba(55, 100, 93, 0.95)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Close Header */}
        <div className="flex justify-between items-center px-margin-mobile py-4 h-16 w-full text-white">
          <div className="h-8">
            <img 
              src="/logo.png" 
              alt="Eixample Sabadell" 
              className="h-8 w-auto object-contain" 
              style={{ filter: "url(#colorize-white)" }}
            />
          </div>
          <button
            className="p-2 text-primary-fixed hover:bg-primary-container/20 rounded-full transition-all active:scale-95"
            onClick={() => setIsOpen(false)}
            aria-label="Tancar menú"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
              close
            </span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow flex flex-col justify-center px-margin-mobile gap-y-8 mt-4">
          {links.map((item, index) => {
            const active = isActive(item.href);
            return (
              <a
                key={index}
                className={`flex items-center gap-4 group text-white transform transition-all duration-300 ${
                  isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                } ${active ? "font-bold text-primary-fixed" : ""}`}
                style={{ transitionDelay: `${index * 75}ms` }}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                <span className="material-symbols-outlined text-primary-fixed" style={{ fontSize: "28px" }}>
                  {item.icon}
                </span>
                <span className="font-headline-lg-mobile text-headline-lg-mobile group-hover:translate-x-2 transition-transform duration-300">
                  {item.label}
                </span>
              </a>
            );
          })}
          {/* Mobile Contact trigger */}
          <button
            className={`flex items-center gap-4 group text-white transform transition-all duration-300 text-left ${
              isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
            }`}
            style={{ transitionDelay: `${links.length * 75}ms` }}
            onClick={() => {
              setIsOpen(false);
              setIsContactOpen(true);
            }}
          >
            <span className="material-symbols-outlined text-primary-fixed" style={{ fontSize: "28px" }}>
              contact_mail
            </span>
            <span className="font-headline-lg-mobile text-headline-lg-mobile group-hover:translate-x-2 transition-transform duration-300">
              {t.contact}
            </span>
          </button>
        </nav>

        {/* Footer / CTA */}
        <div
          className={`p-margin-mobile flex flex-col gap-6 bg-primary-fixed/5 border-t border-primary-fixed/10 pb-12 transition-all duration-500 ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2">
            <div className="font-headline-md text-headline-md text-primary-fixed">
              {t.neighborhoodAssoc}
            </div>
            <div className="font-label-md text-label-md text-primary-fixed-dim">
              {t.subtitle}
            </div>
          </div>
          <button 
            onClick={() => {
              setIsOpen(false);
              window.dispatchEvent(new CustomEvent("open-join-modal"));
            }}
            className="w-full bg-primary-fixed hover:bg-primary-fixed-dim text-on-primary-fixed font-label-md text-label-md py-5 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-black/10"
          >
            {t.joinUs}
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Global Slide-out Contact Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isContactOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-black/45 backdrop-blur-sm"
          onClick={() => setIsContactOpen(false)}
        ></div>

        {/* Drawer panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white text-on-surface shadow-2xl z-50 flex flex-col p-6 transition-transform duration-300 ease-in-out transform ${
            isContactOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8 border-b border-outline-variant/30 pb-4">
            <div className="flex flex-col">
              <h2 className="font-headline-md text-headline-md text-primary font-bold">{t.contactHeader}</h2>
              <span className="font-label-sm text-label-sm text-on-surface-variant">{t.subtitle}</span>
            </div>
            <button
              onClick={() => setIsContactOpen(false)}
              className="p-2 hover:bg-surface-container rounded-full transition-colors"
              aria-label="Tancar panell"
            >
              <span className="material-symbols-outlined text-on-surface" style={{ fontSize: "28px" }}>
                close
              </span>
            </button>
          </div>

          {/* Form Content */}
          {submitted ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-pulse">
                <span className="material-symbols-outlined text-[32px]">check_circle</span>
              </div>
              <h3 className="font-headline-md text-primary font-bold">{t.successTitle}</h3>
              <p className="font-body-md text-on-surface-variant px-6">
                {t.successBody}
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="flex-grow flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="drawer-name" className="font-label-md text-label-md text-on-surface font-semibold">
                  {t.formName}
                </label>
                <input
                  id="drawer-name"
                  type="text"
                  required
                  placeholder={t.formNamePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/40 placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="drawer-email" className="font-label-md text-label-md text-on-surface font-semibold">
                  {t.formEmail}
                </label>
                <input
                  id="drawer-email"
                  type="email"
                  required
                  placeholder={t.formEmailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/40 placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="drawer-message" className="font-label-md text-label-md text-on-surface font-semibold">
                  {t.formMessage}
                </label>
                <textarea
                  id="drawer-message"
                  required
                  rows={6}
                  placeholder={t.formMessagePlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/40 placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-container text-white font-label-md text-label-md py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md mt-auto mb-4"
              >
                <span>{t.formSubmit}</span>
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
