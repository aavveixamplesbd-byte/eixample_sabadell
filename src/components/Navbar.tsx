import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isHome, setIsHome] = useState(true);

  // Contact Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      setIsHome(path === "/" || path === "/index.html" || path.endsWith("/eixample_industrial_sabadell/"));
    }
  }, []);

  const links = isHome
    ? [
        { label: "History", icon: "factory", href: "/historia" },
        { label: "News", icon: "newspaper", href: "/noticies" },
      ]
    : [
        { label: "Home", icon: "home", href: "/" },
        { label: "History", icon: "factory", href: "/historia" },
        { label: "News", icon: "newspaper", href: "/noticies" },
      ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setSubmitted(true);
    setTimeout(() => {
      // Clear form
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
      setIsContactOpen(false);
    }, 2000);
  };

  return (
    <>
      {/* Responsive Header */}
      <header className="sticky top-0 bg-surface/90 backdrop-blur-md z-40 border-b border-surface-variant/50 w-full transition-all duration-300">
        <div className="flex justify-between items-center py-4 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto w-full">
          {/* Logo / Brand */}
          <a href="/">
            <h1 className="font-headline-md text-headline-md text-primary uppercase tracking-wider font-semibold">
              Eixample Sabadell
            </h1>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-x-8">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="font-label-md text-label-md text-secondary hover:text-primary transition-colors relative py-2 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            {/* Desktop Contact Trigger */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="font-label-md text-label-md text-secondary hover:text-primary transition-colors relative py-2 group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button className="bg-primary hover:bg-primary-container text-white font-label-md text-label-md px-6 py-2.5 rounded-lg active:scale-95 transition-all shadow-sm">
              Join Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 text-primary hover:bg-primary/5 rounded-full transition-all active:scale-95 md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Obrir menú"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
              menu
            </span>
          </button>
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
          <div className="font-headline-sm text-headline-sm text-primary-fixed uppercase tracking-wider">
            Eixample Sabadell
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
          {links.map((item, index) => (
            <a
              key={index}
              className={`flex items-center gap-4 group text-white transform transition-all duration-300 ${
                isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
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
          ))}
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
              Contact
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
              Neighborhood Association
            </div>
            <div className="font-label-md text-label-md text-primary-fixed-dim">
              Sabadell's Industrial Heart
            </div>
          </div>
          <button className="w-full bg-primary-fixed hover:bg-primary-fixed-dim text-on-primary-fixed font-label-md text-label-md py-5 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-black/10">
            Join Us
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
              <h2 className="font-headline-md text-headline-md text-primary font-bold">Contacta amb nosaltres</h2>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Sabadell's Industrial Heart</span>
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
              <h3 className="font-headline-md text-primary font-bold">Missatge Enviat!</h3>
              <p className="font-body-md text-on-surface-variant px-6">
                Gràcies per posar-te en contacte. Et respondrem el més aviat possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="flex-grow flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="drawer-name" className="font-label-md text-label-md text-on-surface font-semibold">
                  Nom complet
                </label>
                <input
                  id="drawer-name"
                  type="text"
                  required
                  placeholder="El teu nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/40 placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="drawer-email" className="font-label-md text-label-md text-on-surface font-semibold">
                  Correu electrònic
                </label>
                <input
                  id="drawer-email"
                  type="email"
                  required
                  placeholder="nom@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/40 placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="drawer-message" className="font-label-md text-label-md text-on-surface font-semibold">
                  Missatge
                </label>
                <textarea
                  id="drawer-message"
                  required
                  rows={6}
                  placeholder="Com et podem ajudar?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/40 placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-container text-white font-label-md text-label-md py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md mt-auto mb-4"
              >
                <span>Enviar missatge</span>
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
