import React, { useState, useEffect } from "react";

// Spanish DNI/NIE Validator
function validateDNI(value: string): boolean {
  const clean = value.toUpperCase().replace(/[\s-]/g, "");
  if (!/^[XYZ\d]\d{7}[A-Z]$/.test(clean)) return false;

  const letterMap = "TRWAGMYFPDXBNJZSQVHLCKE";
  let checkStr = clean;

  // Convert NIE prefix to digits
  if (checkStr.startsWith("X")) checkStr = "0" + checkStr.slice(1);
  else if (checkStr.startsWith("Y")) checkStr = "1" + checkStr.slice(1);
  else if (checkStr.startsWith("Z")) checkStr = "2" + checkStr.slice(1);

  const numPart = parseInt(checkStr.slice(0, 8), 10);
  const letter = checkStr.slice(8);
  const correctLetter = letterMap[numPart % 23];

  return letter === correctLetter;
}

// Spanish IBAN Validator (ES + 22 digits)
function validateSpanishIBAN(value: string): boolean {
  const clean = value.toUpperCase().replace(/[\s-]/g, "");
  if (!/^ES\d{22}$/.test(clean)) return false;

  // Move ESxx to the end and convert to numbers (E = 14, S = 28)
  // ESxx -> xxES -> xx1428
  const countryCodeNumeric = "1428";
  const digits = clean.slice(4) + countryCodeNumeric + clean.slice(2, 4);

  // Perform modulo 97 with BigInt to support long numeric string
  try {
    const bigNum = BigInt(digits);
    return bigNum % 97n === 1n;
  } catch (e) {
    return false;
  }
}

export default function JoinModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [iban, setIban] = useState("");
  const [sepaConsent, setSepaConsent] = useState(false);

  // Error States
  const [dniError, setDniError] = useState("");
  const [ibanError, setIbanError] = useState("");

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setSubmitted(false);
      // Reset fields
      setName("");
      setDni("");
      setEmail("");
      setPhone("");
      setIban("");
      setSepaConsent(false);
      setDniError("");
      setIbanError("");
    };

    window.addEventListener("open-join-modal", handleOpen);
    return () => window.removeEventListener("open-join-modal", handleOpen);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    // Validate DNI
    if (!validateDNI(dni)) {
      setDniError("DNI o NIE no vàlid. Comprova el format i la lletra de control.");
      hasError = true;
    } else {
      setDniError("");
    }

    // Validate IBAN
    if (!validateSpanishIBAN(iban)) {
      setIbanError("IBAN espanyol no vàlid (ha de començar per ES i tenir 24 caràcters).");
      hasError = true;
    } else {
      setIbanError("");
    }

    if (hasError) return;

    // Simulate API call
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden text-on-surface flex flex-col max-h-[90vh] z-10 animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-outline-variant/30 shrink-0">
          <div>
            <h3 className="font-headline-md text-headline-md text-primary font-bold">Fes-te Soci / Sòcia</h3>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Quota de 10€ anuals domiciliats</p>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-surface-container rounded-full transition-colors"
            aria-label="Tancar finestra"
          >
            <span className="material-symbols-outlined text-on-surface" style={{ fontSize: "24px" }}>
              close
            </span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-grow">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-8 space-y-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-bounce">
                <span className="material-symbols-outlined text-[40px]">mark_email_read</span>
              </div>
              <div className="space-y-3">
                <h4 className="font-headline-md text-primary font-bold">Sol·licitud Rebuta!</h4>
                <p className="font-body-md text-on-surface-variant px-4 leading-relaxed">
                  Gràcies per unir-te a l'Associació de Veïns Eixample Sabadell.
                </p>
              </div>
              
              <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/20 text-left max-w-sm">
                <h5 className="font-label-md text-primary font-bold mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  Seguretat i confirmació de compte
                </h5>
                <p className="font-body-sm text-on-surface-variant leading-relaxed">
                  Per prevenció del frau i complir la normativa de domiciliacions, t'hem enviat un correu electrònic amb el document de <strong>Mandat SEPA</strong> de format digital. L'hauràs de signar per procedir a l'activació de la teva quota.
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="bg-primary hover:bg-primary-container text-white px-8 py-3 rounded-xl font-label-md font-bold transition-all shadow-md"
              >
                Entès
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="join-name" className="font-label-md text-on-surface font-semibold">
                  Nom i cognoms del titular
                </label>
                <input
                  id="join-name"
                  type="text"
                  required
                  placeholder="Ex. Joan Garcia i Pujol"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="join-dni" className="font-label-md text-on-surface font-semibold">
                    DNI / NIE
                  </label>
                  <input
                    id="join-dni"
                    type="text"
                    required
                    placeholder="Ex. 12345678Z o Y1234567Z"
                    value={dni}
                    onChange={(e) => {
                      setDni(e.target.value);
                      if (dniError) setDniError("");
                    }}
                    className={`w-full px-4 py-2.5 rounded-lg bg-surface-container-low border outline-none focus:ring-2 focus:ring-primary transition-all ${
                      dniError ? "border-error" : "border-outline-variant/40"
                    }`}
                  />
                  {dniError && <span className="text-error font-label-sm text-xs mt-1">{dniError}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="join-phone" className="font-label-md text-on-surface font-semibold">
                    Telèfon
                  </label>
                  <input
                    id="join-phone"
                    type="tel"
                    required
                    placeholder="Ex. 600 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="join-email" className="font-label-md text-on-surface font-semibold">
                  Correu electrònic
                </label>
                <input
                  id="join-email"
                  type="email"
                  required
                  placeholder="Ex. joan@exemple.cat"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="join-iban" className="font-label-md text-on-surface font-semibold">
                  Número de Compte Bancari (IBAN)
                </label>
                <input
                  id="join-iban"
                  type="text"
                  required
                  placeholder="ES00 0000 0000 0000 0000 0000"
                  value={iban}
                  onChange={(e) => {
                    setIban(e.target.value);
                    if (ibanError) setIbanError("");
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg bg-surface-container-low border outline-none focus:ring-2 focus:ring-primary transition-all ${
                    ibanError ? "border-error" : "border-outline-variant/40"
                  }`}
                />
                {ibanError && <span className="text-error font-label-sm text-xs mt-1">{ibanError}</span>}
              </div>

              <div className="flex gap-3 items-start bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
                <input
                  id="join-sepa"
                  type="checkbox"
                  required
                  checked={sepaConsent}
                  onChange={(e) => setSepaConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary bg-white border-outline-variant rounded focus:ring-primary cursor-pointer"
                />
                <label htmlFor="join-sepa" className="font-body-sm text-on-surface-variant leading-relaxed select-none cursor-pointer">
                  Autoritzo l'Associació de Veïns Eixample Sabadell a realitzar una domiciliació bancària anual de <strong>10,00 €</strong> en la compta indicada d'acord amb les condicions del Mandat SEPA.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-container text-white font-label-md font-bold py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md mt-4"
              >
                <span>Enviar sol·licitud</span>
                <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
