import React, { useState, useEffect } from 'react';
import soparData from '../data/festa-major.json';

const { sopar } = soparData;

interface SoparFormProps {
  lang?: 'ca' | 'es';
}

export default function SoparForm({ lang = 'ca' }: SoparFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const menu = sopar.menu[lang];
  const caterer = sopar.caterer[lang];
  const total = guests * sopar.price;

  const t = {
    ca: {
      title: 'Sopar de Festa Major',
      dateLabel: 'Dissabte 26 de setembre, 21h',
      priceLabel: `${sopar.price}€ per persona`,
      menuTitle: 'Menú',
      catererLabel: caterer,
      phoneNote: `També pots reservar per telèfon o WhatsApp al ${sopar.reservationPhone}`,
      nameLabel: 'Nom complet',
      namePlaceholder: 'El teu nom i cognoms',
      phoneLabel: 'Telèfon',
      phonePlaceholder: '612 345 678',
      emailLabel: 'Email',
      emailPlaceholder: 'el-teu@email.com',
      guestsLabel: 'Nombre de comensals',
      notesLabel: 'Observacions / al·lèrgies',
      notesPlaceholder: 'Indica si tens al·lèrgies, intoleràncies...',
      totalLabel: 'Total',
      submitBtn: 'Reservar plaça',
      submittingBtn: 'Enviant reserva...',
      successTitle: 'Reserva confirmada!',
      successDesc: 'Hem enviat un correu de confirmació a la teva adreça electrònica amb els detalls de la reserva.',
      successBack: 'Tancar',
      errorRequired: 'Si us plau, omple tots els camps obligatoris.',
      errorServer: 'Hi ha hagut un error en enviar la reserva. Torna-ho a intentar.',
      formTitle: 'Formulari de reserva',
      locationLabel: 'Av. Barberà (Carpa AVV)',
    },
    es: {
      title: 'Cena de Fiesta Mayor',
      dateLabel: 'Sábado 26 de septiembre, 21h',
      priceLabel: `${sopar.price}€ por persona`,
      menuTitle: 'Menú',
      catererLabel: caterer,
      phoneNote: `También puedes reservar por teléfono o WhatsApp al ${sopar.reservationPhone}`,
      nameLabel: 'Nombre completo',
      namePlaceholder: 'Tu nombre y apellidos',
      phoneLabel: 'Teléfono',
      phonePlaceholder: '612 345 678',
      emailLabel: 'Email',
      emailPlaceholder: 'tu@email.com',
      guestsLabel: 'Número de comensales',
      notesLabel: 'Observaciones / alergias',
      notesPlaceholder: 'Indica si tienes alergias, intolerancias...',
      totalLabel: 'Total',
      submitBtn: 'Reservar plaza',
      submittingBtn: 'Enviando reserva...',
      successTitle: '¡Reserva confirmada!',
      successDesc: 'Hemos enviado un correo de confirmación a tu dirección de correo electrónico con los detalles de la reserva.',
      successBack: 'Cerrar',
      errorRequired: 'Por favor, rellena todos los campos obligatorios.',
      errorServer: 'Ha habido un error al enviar la reserva. Inténtalo de nuevo.',
      formTitle: 'Formulario de reserva',
      locationLabel: 'Av. Barberà (Carpa AVV)',
    },
  }[lang];

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-sopar-modal', handleOpen);
    return () => window.removeEventListener('open-sopar-modal', handleOpen);
  }, []);

  // Bloquejar scroll si està obert
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg(t.errorRequired);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/sopar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          guests,
          notes: notes.trim(),
          lang,
        }),
      });

      if (!response.ok) throw new Error('API call failed');
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting sopar form:', err);
      setErrorMsg(t.errorServer);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeAndReset = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
      setGuests(2);
      setNotes('');
      setErrorMsg('');
    }, 300); // Esperar a l'animació de tancament
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeAndReset}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up max-h-[95vh] flex flex-col">
        
        {/* Close Button Top Right */}
        <button 
          onClick={closeAndReset}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-black/10 flex items-center justify-center text-on-surface transition-colors z-20"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {isSubmitted ? (
          /* ── Success state ── */
          <div className="p-12 md:p-20 flex flex-col items-center justify-center text-center overflow-y-auto">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
              <span className="material-symbols-outlined text-[48px]">check_circle</span>
            </div>
            <h2 className="font-display-lg text-4xl font-bold text-primary mb-4">
              {t.successTitle}
            </h2>
            <p className="font-body-md text-on-surface-variant max-w-lg mb-6 text-lg leading-relaxed">
              {t.successDesc}
            </p>
            <div className="bg-surface-container-low rounded-xl px-8 py-6 mb-10 w-full max-w-md border border-outline-variant/30">
              <p className="font-body-md text-on-surface text-lg">
                <span className="font-semibold">{name}</span> — {guests}{' '}
                {lang === 'ca' ? 'comensals' : 'comensales'}
              </p>
              <p className="font-display-lg text-3xl font-bold text-primary mt-2">
                {guests * sopar.price}€
              </p>
            </div>
            <button
              onClick={closeAndReset}
              className="bg-primary hover:bg-primary-container text-white font-label-md font-bold px-10 py-4 rounded-xl transition-all shadow-md active:scale-95 text-lg"
            >
              {t.successBack}
            </button>
          </div>
        ) : (
          /* ── 2-Column Layout Inside Modal ── */
          <div className="grid grid-cols-1 lg:grid-cols-5 h-full overflow-y-auto">
            
            {/* Left column: Info */}
            <div className="bg-primary p-8 md:p-12 text-on-primary lg:col-span-2 flex flex-col justify-center">
              <span className="material-symbols-outlined text-[48px] mb-6 block opacity-90 text-primary-fixed">
                restaurant
              </span>
              <h2 className="font-display-lg text-4xl font-extrabold mb-6 leading-tight">
                {t.title}
              </h2>

              <div className="space-y-4 mb-10 opacity-90">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">calendar_today</span>
                  <span className="font-body-md text-lg">{t.dateLabel}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">location_on</span>
                  <span className="font-body-md text-lg">{t.locationLabel}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">sell</span>
                  <span className="font-body-md text-lg font-semibold">{t.priceLabel}</span>
                </div>
              </div>

              {/* Menu */}
              <div className="bg-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm border border-white/10">
                <h3 className="font-headline-md text-xl font-bold mb-4 flex items-center gap-2 text-primary-fixed">
                  <span className="material-symbols-outlined text-[24px]">menu_book</span>
                  {t.menuTitle}
                </h3>
                <ul className="space-y-3">
                  {menu.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 font-body-md">
                      <span className="mt-1 opacity-70 text-primary-fixed">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Caterer & Phone */}
              <div className="mt-auto space-y-3 pt-6 border-t border-white/20">
                <p className="font-body-md text-sm opacity-90 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">storefront</span>
                  {t.catererLabel}
                </p>
                <p className="font-body-md text-sm opacity-90 flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] mt-0.5">phone</span>
                  {t.phoneNote}
                </p>
              </div>
            </div>

            {/* Right column: Form */}
            <div className="p-8 md:p-12 lg:col-span-3 bg-white flex flex-col justify-center">
              <h3 className="font-headline-md text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-[28px]">edit_note</span>
                {t.formTitle}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom complet */}
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface font-semibold">
                    {t.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full px-5 py-4 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all font-body-md"
                  />
                </div>

                {/* Telèfon & Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-on-surface font-semibold">
                      {t.phoneLabel} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.phonePlaceholder}
                      className="w-full px-5 py-4 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all font-body-md"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-on-surface font-semibold">
                      {t.emailLabel} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full px-5 py-4 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all font-body-md"
                    />
                  </div>
                </div>

                {/* Nombre de comensals */}
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface font-semibold">
                    {t.guestsLabel} *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={20}
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, Math.min(20, Number(e.target.value))))}
                    className="w-full px-5 py-4 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all font-body-md"
                  />
                </div>

                {/* Observacions */}
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface font-semibold">
                    {t.notesLabel}
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.notesPlaceholder}
                    rows={3}
                    className="w-full px-5 py-4 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all font-body-md resize-none"
                  />
                </div>

                {/* Total price */}
                <div className="bg-primary-container/20 rounded-2xl px-6 py-5 flex items-center justify-between border border-primary-container/30">
                  <span className="font-label-md text-on-surface font-semibold text-xl">
                    {t.totalLabel}
                  </span>
                  <span className="font-display-lg text-4xl font-extrabold text-primary">
                    {total}€
                  </span>
                </div>

                {/* Error message */}
                {errorMsg && (
                  <div className="bg-error-container rounded-xl px-5 py-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-error-container text-[24px]">error</span>
                    <span className="font-body-md text-on-error-container text-base">{errorMsg}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-container text-on-primary font-display-lg text-xl font-bold px-8 py-5 rounded-full flex items-center justify-center gap-3 transition-all shadow-md active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      {t.submittingBtn}
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">check_circle</span>
                      {t.submitBtn}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
