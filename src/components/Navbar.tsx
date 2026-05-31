import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "History", icon: "factory", href: "/#llegat" },
    { label: "News", icon: "newspaper", href: "/noticies" },
    { label: "Services", icon: "handyman", href: "/#serveis" },
    { label: "Contact", icon: "contact_mail", href: "/#contacte" },
  ];

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
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "32px" }}
            >
              menu
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col transition-all duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: "rgba(55, 100, 93, 0.95)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Close Header */}
        <div className="flex justify-between items-center px-margin-mobile py-4 h-16 w-full">
          <div className="font-headline-sm text-headline-sm text-primary-fixed uppercase tracking-wider">
            Eixample Sabadell
          </div>
          <button
            className="p-2 text-primary-fixed hover:bg-primary-container/20 rounded-full transition-all active:scale-95"
            onClick={() => setIsOpen(false)}
            aria-label="Tancar menú"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "32px" }}
            >
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
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              <span
                className="material-symbols-outlined text-primary-fixed"
                style={{ fontSize: "28px" }}
              >
                {item.icon}
              </span>
              <span className="font-headline-lg-mobile text-headline-lg-mobile group-hover:translate-x-2 transition-transform duration-300">
                {item.label}
              </span>
            </a>
          ))}
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
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "18px" }}
            >
              arrow_forward
            </span>
          </button>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <a
              className="font-label-sm text-label-sm text-primary-fixed-dim opacity-70 hover:opacity-100 transition-opacity"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-label-sm text-label-sm text-primary-fixed-dim opacity-70 hover:opacity-100 transition-opacity"
              href="#"
            >
              Archive
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Industrial Element (Floating Gear) */}
      <div
        className="fixed -bottom-20 -right-20 opacity-5 pointer-events-none select-none text-primary"
        style={{ fontSize: "320px", zIndex: -1 }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "320px" }}
        >
          settings
        </span>
      </div>
    </>
  );
}
