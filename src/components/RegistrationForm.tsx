import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";

// Spanish DNI/NIE Validator
function validateDNI(value: string): boolean {
  const clean = value.toUpperCase().replace(/[\s-]/g, "");
  if (!/^[XYZ\d]\d{7}[A-Z]$/.test(clean)) return false;

  const letterMap = "TRWAGMYFPDXBNJZSQVHLCKE";
  let checkStr = clean;

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

  const countryCodeNumeric = "1428";
  const digits = clean.slice(4) + countryCodeNumeric + clean.slice(2, 4);

  try {
    const bigNum = BigInt(digits);
    return bigNum % 97n === 1n;
  } catch (e) {
    return false;
  }
}

// Helper to load logo from URL and get Base64
const getBase64ImageFromUrl = async (url: string): Promise<string> => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
  });
};

export default function RegistrationForm() {
  const [lang, setLang] = useState<"ca" | "es">("ca");
  const [logoBase64, setLogoBase64] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [pdfDataUrl, setPdfDataUrl] = useState<string>("");

  // Personal Fields
  const [nom, setNom] = useState("");
  const [cognoms, setCognoms] = useState("");
  const [dni, setDni] = useState("");
  const [dataNaixement, setDataNaixement] = useState("");
  const [adreça, setAdreça] = useState("");
  const [num, setNum] = useState("");
  const [escala, setEscala] = useState("");
  const [pis, setPis] = useState("");
  const [porta, setPorta] = useState("");
  const [cp, setCp] = useState("");
  const [poblacio, setPoblacio] = useState("Sabadell");
  const [telefon, setTelefon] = useState("");
  const [mobil, setMobil] = useState("");
  const [professio, setProfessio] = useState("");
  const [email, setEmail] = useState("");

  // SEPA Fields
  const [sameAsMember, setSameAsMember] = useState(true);
  const [sepaTitular, setSepaTitular] = useState("");
  const [sepaAdreça, setSepaAdreça] = useState("");
  const [sepaCp, setSepaCp] = useState("");
  const [sepaDni, setSepaDni] = useState("");
  const [sepaEntitat, setSepaEntitat] = useState("");
  const [sepaIban, setSepaIban] = useState("");

  // Consent & Signature
  const [consentLopd, setConsentLopd] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // Errors
  const [dniError, setDniError] = useState("");
  const [sepaDniError, setSepaDniError] = useState("");
  const [ibanError, setIbanError] = useState("");
  const [signatureError, setSignatureError] = useState("");

  // Signature Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Load logo on mount
  useEffect(() => {
    getBase64ImageFromUrl("/logo.png")
      .then(setLogoBase64)
      .catch((err) => console.error("Error loading logo for PDF:", err));
  }, []);

  // Autofill SEPA when sameAsMember changes
  useEffect(() => {
    if (sameAsMember) {
      setSepaTitular(`${nom} ${cognoms}`.trim());
      setSepaAdreça(
        `${adreça} ${num} ${escala ? `Esc. ${escala}` : ""} ${
          pis ? `Pis ${pis}` : ""
        } ${porta ? `Porta ${porta}` : ""}`.trim()
      );
      setSepaCp(cp);
      setSepaDni(dni);
    }
  }, [sameAsMember, nom, cognoms, adreça, num, escala, pis, porta, cp, dni]);

  // Dictionary for translations
  const t = {
    ca: {
      title: "Butlletí d'inscripció de soci",
      subtitle: "Registra't online i forma part de l'Associació de Veïns Eixample Sabadell",
      langToggle: "Español",
      personalHeader: "1. Dades Personals",
      sepaHeader: "2. Mandat SEPA i Dades Bancàries",
      sepaSubtitle: "Autorització per a la domiciliació de la quota de soci (12€ anuals)",
      signatureHeader: "3. Firma Digital i Consentiment",
      nom: "Nom",
      cognoms: "Cognoms",
      dni: "DNI / NIE",
      dataNaixement: "Data de Naixement",
      adreça: "Adreça (carrer, plaça, etc.)",
      num: "Núm.",
      escala: "Escala",
      pis: "Pis",
      porta: "Porta",
      cp: "Codi Postal",
      poblacio: "Població",
      telefon: "Telèfon fix",
      mobil: "Telèfon mòbil",
      professio: "Professió",
      email: "Correu electrònic",
      sameAsMemberLabel: "El titular de la domiciliació és el mateix soci",
      sepaTitular: "Nom i Cognoms del Titular",
      sepaAdreça: "Adreça del Titular",
      sepaCp: "Codi Postal del Titular",
      sepaDni: "DNI del Titular",
      sepaEntitat: "Entitat Bancària",
      sepaIban: "IBAN del compte bancari (Espanyol)",
      ibanPlaceholder: "ES00 0000 0000 0000 0000 0000",
      sepaText: "El/la sota signant autoritza a l'Associació de Veïns de l'Eixample a efectuar el cobrament de les quotes anuals d'associat/associada, fins a nova ordre, en el compte bancari anteriorment ressenyat. Així mateix autoritza a l'Associació de Veïns de l'Eixample, a fer ús de les seves dades comercials única i exclusivament per a les activitats que dugui a terme l'associació, conforme a la normativa de la llei de protecció de dades vigent.",
      lopdCheck: "Accepto la política de privacitat i el tractament de les meves dades segons la LOPD.",
      signaturePlaceholder: "Dibuixa la teva signatura aquí amb el ratolí o el dit",
      clearBtn: "Netejar signatura",
      submitBtn: "Finalitzar i enviar inscripció",
      submittingBtn: "Processant i enviant...",
      errorDni: "Format de DNI o NIE no vàlid.",
      errorIban: "IBAN espanyol no vàlid (ES + 22 dígits).",
      errorSignature: "Si us plau, signa el document abans d'enviar.",
      successTitle: "Inscripció enviada correctament!",
      successDesc: "Hem enviat el document PDF del butlletí completat i signat al correu de l'associació i una còpia a la teva adreça electrònica.",
      downloadPdf: "Descarregar el meu butlletí PDF",
      newForm: "Omplir un nou formulari",
      sabadellDate: (d: number, m: string, y: number) => `Sabadell, ${d} de ${m} de ${y}`
    },
    es: {
      title: "Boletín de inscripción de socio",
      subtitle: "Regístrate online y forma parte de la Asociación de Vecinos Eixample Sabadell",
      langToggle: "Català",
      personalHeader: "1. Datos Personales",
      sepaHeader: "2. Mandato SEPA y Datos Bancarios",
      sepaSubtitle: "Autorización para la domiciliación de la cuota de socio (12€ anuales)",
      signatureHeader: "3. Firma Digital y Consentimiento",
      nom: "Nombre",
      cognoms: "Apellidos",
      dni: "DNI / NIE",
      dataNaixement: "Fecha de Nacimiento",
      adreça: "Dirección (calle, plaza, etc.)",
      num: "Núm.",
      escala: "Escalera",
      pis: "Piso",
      porta: "Puerta",
      cp: "Código Postal",
      poblacio: "Población",
      telefon: "Teléfono fijo",
      mobil: "Teléfono móvil",
      professio: "Profesión",
      email: "Correo electrónico",
      sameAsMemberLabel: "El titular de la domiciliación es el mismo socio",
      sepaTitular: "Nombre y Apellidos del Titular",
      sepaAdreça: "Dirección del Titular",
      sepaCp: "Código Postal del Titular",
      sepaDni: "DNI del Titular",
      sepaEntitat: "Entidad Bancaria",
      sepaIban: "IBAN de la cuenta bancaria (Español)",
      ibanPlaceholder: "ES00 0000 0000 0000 0000 0000",
      sepaText: "El/la abajo firmante autoriza a la Asociación de Vecinos del Eixample a efectuar el cobro de las cuotas anuales de asociado/asociada, hasta nueva orden, en la cuenta bancaria anteriormente reseñada. Asimismo autoriza a la Asociación de Vecinos del Eixample, a hacer uso de sus datos comerciales única i exclusivamente para las actividades que lleve a cabo la asociación, conforme a la normativa de la ley de protección de datos vigente.",
      lopdCheck: "Acepto la política de privacidad y el tratamiento de mis datos según la LOPD.",
      signaturePlaceholder: "Dibuja tu firma aquí con el ratón o el dedo",
      clearBtn: "Limpiar firma",
      submitBtn: "Finalizar y enviar inscripción",
      submittingBtn: "Procesando y enviando...",
      errorDni: "Formato de DNI o NIE no válido.",
      errorIban: "IBAN español no válido (ES + 22 dígitos).",
      errorSignature: "Por favor, firma el documento antes de enviar.",
      successTitle: "¡Inscripción enviada correctamente!",
      successDesc: "Hemos enviado el documento PDF del boletín completado y firmado al correo de la asociación y una copia a tu dirección de correo electrónico.",
      downloadPdf: "Descargar mi boletín PDF",
      newForm: "Rellenar otro formulario",
      sabadellDate: (d: number, m: string, y: number) => `Sabadell, ${d} de ${m} de ${y}`
    }
  }[lang];

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#00201c"; // dark premium ink color

    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
    setHasSignature(true);
    setSignatureError("");
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    e.preventDefault();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    if ("touches" in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  // Format IBAN as user types
  const handleIbanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawVal = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!rawVal.startsWith("ES") && rawVal.length > 0) {
      rawVal = "ES" + rawVal.replace(/[^0-9]/g, "");
    }
    // Limit to 24 chars
    rawVal = rawVal.slice(0, 24);

    // Format with spaces every 4 characters
    const parts = rawVal.match(/.{1,4}/g) || [];
    setSepaIban(parts.join(" "));
    if (ibanError) setIbanError("");
  };

  // Generate the PDF
  const generatePDF = (): jsPDF => {
    const doc = new jsPDF("p", "mm", "a4");

    // Margins are 15mm
    const leftMargin = 15;
    const rightMargin = 195;
    let y = 15;

    // Logo
    if (logoBase64) {
      doc.addImage(logoBase64, "PNG", leftMargin, y, 22, 18);
    }

    // Header Text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor("#191c1c");
    doc.text("Butlletí d'inscripció a l'Associació de Veïns de", 42, y + 6);
    doc.text("l'Eixample de Sabadell", 42, y + 11);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor("#404846");
    doc.text("Sardà, 18 baixos. 08203 Sabadell Tel. 930 375 661 Mòbil: 672 520 479", 42, y + 16);
    doc.text("e-mail: aavveixamplesbd@gmail.com", 42, y + 20);

    y += 24;

    // Divider line
    doc.setDrawColor("#bcc9c6");
    doc.setLineWidth(0.3);
    doc.line(leftMargin, y, rightMargin, y);

    y += 8;

    // Content: Personal details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor("#37645d");
    doc.text("DADES PERSONALS / DATOS PERSONALES", leftMargin, y);

    y += 6;
    doc.setFontSize(9);
    doc.setTextColor("#191c1c");

    // Nom i Cognoms
    doc.setFont("helvetica", "bold"); doc.text("Nom / Nombre:", leftMargin, y);
    doc.setFont("helvetica", "normal"); doc.text(nom, leftMargin + 25, y);
    doc.setFont("helvetica", "bold"); doc.text("Cognoms / Apellidos:", leftMargin + 85, y);
    doc.setFont("helvetica", "normal"); doc.text(cognoms, leftMargin + 120, y);

    y += 7;
    // DNI i Data Naixement
    doc.setFont("helvetica", "bold"); doc.text("D.N.I / N.I.E:", leftMargin, y);
    doc.setFont("helvetica", "normal"); doc.text(dni.toUpperCase(), leftMargin + 25, y);
    doc.setFont("helvetica", "bold"); doc.text("Data Naixement:", leftMargin + 85, y);
    doc.setFont("helvetica", "normal"); doc.text(dataNaixement, leftMargin + 120, y);

    y += 7;
    // Adreça
    doc.setFont("helvetica", "bold"); doc.text("Adreça / Dirección:", leftMargin, y);
    doc.setFont("helvetica", "normal"); doc.text(adreça, leftMargin + 32, y);

    y += 7;
    // Detalls adreça
    doc.setFont("helvetica", "bold"); doc.text("Núm:", leftMargin, y);
    doc.setFont("helvetica", "normal"); doc.text(num, leftMargin + 10, y);
    doc.setFont("helvetica", "bold"); doc.text("Escala:", leftMargin + 30, y);
    doc.setFont("helvetica", "normal"); doc.text(escala, leftMargin + 43, y);
    doc.setFont("helvetica", "bold"); doc.text("Pis / Piso:", leftMargin + 70, y);
    doc.setFont("helvetica", "normal"); doc.text(pis, leftMargin + 88, y);
    doc.setFont("helvetica", "bold"); doc.text("Porta / Puerta:", leftMargin + 115, y);
    doc.setFont("helvetica", "normal"); doc.text(porta, leftMargin + 138, y);

    y += 7;
    // CP i Població
    doc.setFont("helvetica", "bold"); doc.text("C. P.:", leftMargin, y);
    doc.setFont("helvetica", "normal"); doc.text(cp, leftMargin + 12, y);
    doc.setFont("helvetica", "bold"); doc.text("Població / Población:", leftMargin + 85, y);
    doc.setFont("helvetica", "normal"); doc.text(poblacio, leftMargin + 120, y);

    y += 7;
    // Telèfon, Mòbil, Professió
    doc.setFont("helvetica", "bold"); doc.text("Telèfon / Teléf.:", leftMargin, y);
    doc.setFont("helvetica", "normal"); doc.text(telefon, leftMargin + 25, y);
    doc.setFont("helvetica", "bold"); doc.text("Mòbil / Móvil:", leftMargin + 70, y);
    doc.setFont("helvetica", "normal"); doc.text(mobil, leftMargin + 93, y);
    doc.setFont("helvetica", "bold"); doc.text("Professió / Prof.:", leftMargin + 130, y);
    doc.setFont("helvetica", "normal"); doc.text(professio, leftMargin + 158, y);

    y += 7;
    // Correu
    doc.setFont("helvetica", "bold"); doc.text("e-mail:", leftMargin, y);
    doc.setFont("helvetica", "normal"); doc.text(email, leftMargin + 15, y);

    y += 12;

    // SEPA Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor("#37645d");
    doc.text("AUTORITZACIÓ PER A LA DOMICILITZACIÓ QUOTA SOCI AVV EIXAMPLE SABADELL", leftMargin, y);

    y += 4;
    // SEPA Box border
    const boxStartY = y;
    doc.setDrawColor("#37645d");
    doc.setLineWidth(0.4);
    doc.rect(leftMargin, boxStartY, 180, 52); // Rect from 15 to 195

    doc.setTextColor("#191c1c");
    doc.setFontSize(8.5);

    y += 6;
    doc.setFont("helvetica", "bold"); doc.text("Nom i Cognoms del Titular:", leftMargin + 4, y);
    doc.setFont("helvetica", "normal"); doc.text(sepaTitular, leftMargin + 48, y);

    y += 7;
    doc.setFont("helvetica", "bold"); doc.text("Adreça del Titular:", leftMargin + 4, y);
    doc.setFont("helvetica", "normal"); doc.text(sepaAdreça, leftMargin + 32, y);
    doc.setFont("helvetica", "bold"); doc.text("C. P.:", leftMargin + 135, y);
    doc.setFont("helvetica", "normal"); doc.text(sepaCp, leftMargin + 145, y);

    y += 7;
    doc.setFont("helvetica", "bold"); doc.text("D.N.I / N.I.E:", leftMargin + 4, y);
    doc.setFont("helvetica", "normal"); doc.text(sepaDni.toUpperCase(), leftMargin + 25, y);

    y += 7;
    doc.setFont("helvetica", "bold");
    doc.text("AUTORITZO A L'ASSOCIACIÓ DE VEÏNS DE L'EIXAMPLE DE SABADELL (NIF G-60991270):", leftMargin + 4, y);

    y += 7;
    doc.text("DADES BANCÀRIES / DATOS BANCARIOS:", leftMargin + 4, y);

    y += 7;
    doc.setFont("helvetica", "bold"); doc.text("ENTITAT / ENTIDAD:", leftMargin + 4, y);
    doc.setFont("helvetica", "normal"); doc.text(sepaEntitat, leftMargin + 36, y);
    doc.setFont("helvetica", "bold"); doc.text("NÚMERO DE COMPTE (IBAN):", leftMargin + 85, y);
    doc.setFont("helvetica", "normal"); doc.text(sepaIban.toUpperCase(), leftMargin + 132, y);

    y += 14; // y is now boxStartY + 52 + 6 = boxStartY + 58

    // LOPD / Authorization text
    doc.setFontSize(7.5);
    doc.setTextColor("#404846");
    doc.setFont("helvetica", "normal");

    // Word wrap authorization text
    const textLines = doc.splitTextToSize(t.sepaText, 180);
    doc.text(textLines, leftMargin, y);

    y += 20;

    // Date
    const today = new Date();
    const monthsCa = ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"];
    const monthsEs = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const monthName = lang === "ca" ? monthsCa[today.getMonth()] : monthsEs[today.getMonth()];
    
    doc.setFontSize(9);
    doc.setTextColor("#191c1c");
    doc.setFont("helvetica", "bold");
    doc.text(t.sabadellDate(today.getDate(), monthName, today.getFullYear()), leftMargin, y);

    // Signature Area
    doc.text("Signatura / Firma:", leftMargin + 110, y);

    const canvas = canvasRef.current;
    if (canvas && hasSignature) {
      const sigDataUrl = canvas.toDataURL("image/png");
      doc.addImage(sigDataUrl, "PNG", leftMargin + 110, y + 2, 45, 18);
    }

    return doc;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    // Validate DNI
    if (!validateDNI(dni)) {
      setDniError(t.errorDni);
      hasError = true;
    } else {
      setDniError("");
    }

    // Validate SEPA DNI
    if (!sameAsMember && !validateDNI(sepaDni)) {
      setSepaDniError(t.errorDni);
      hasError = true;
    } else {
      setSepaDniError("");
    }

    // Validate IBAN
    const cleanIban = sepaIban.replace(/\s/g, "");
    if (!validateSpanishIBAN(cleanIban)) {
      setIbanError(t.errorIban);
      hasError = true;
    } else {
      setIbanError("");
    }

    // Validate Signature
    if (!hasSignature) {
      setSignatureError(t.errorSignature);
      hasError = true;
    } else {
      setSignatureError("");
    }

    if (hasError) {
      // Scroll to the first error or alerts
      window.scrollTo({ top: 300, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate PDF doc
      const doc = generatePDF();
      const pdfBase64String = doc.output("datauristring");

      // Save PDF data url for download client side
      setPdfDataUrl(pdfBase64String);

      // Send to API
      const response = await fetch("/api/inscripcio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${nom} ${cognoms}`.trim(),
          email: email,
          pdfBase64: pdfBase64String
        })
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting enrollment form:", err);
      alert(lang === "es" ? "Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo." : "Hi ha hagut un error en enviar el formulari. Si us plau, torna-ho a intentar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCopy = () => {
    if (!pdfDataUrl) return;
    const link = document.createElement("a");
    link.href = pdfDataUrl;
    link.download = `butlleti_inscripcio_${nom.toLowerCase().replace(/[^a-z0-9]/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setNom("");
    setCognoms("");
    setDni("");
    setDataNaixement("");
    setAdreça("");
    setNum("");
    setEscala("");
    setPis("");
    setPorta("");
    setCp("");
    setPoblacio("Sabadell");
    setTelefon("");
    setMobil("");
    setProfessio("");
    setEmail("");
    setSameAsMember(true);
    setSepaTitular("");
    setSepaAdreça("");
    setSepaCp("");
    setSepaDni("");
    setSepaEntitat("");
    setSepaIban("");
    setConsentLopd(false);
    setHasSignature(false);
    clearCanvas();
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in-up">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-outline-variant/30 text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 animate-bounce">
            <span className="material-symbols-outlined text-[48px]">check_circle</span>
          </div>
          <h2 className="font-display-lg text-3xl font-bold text-primary mb-4">
            {t.successTitle}
          </h2>
          <p className="font-body-lg text-on-surface-variant max-w-lg mb-8 leading-relaxed">
            {t.successDesc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={handleDownloadCopy}
              className="bg-primary hover:bg-primary/90 text-white font-label-md font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <span className="material-symbols-outlined">download</span>
              {t.downloadPdf}
            </button>
            <button
              onClick={resetForm}
              className="border border-outline hover:bg-surface-container-low text-on-surface font-label-md font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">restart_alt</span>
              {t.newForm}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 animate-fade-in-up">
      {/* Header card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-outline-variant/20 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="font-display-lg text-3xl md:text-4xl font-extrabold text-on-surface mb-2">
            {t.title}
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-xl">
            {t.subtitle}
          </p>
        </div>
        <button
          onClick={() => setLang(lang === "ca" ? "es" : "ca")}
          className="px-5 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 font-label-md font-semibold rounded-xl transition-all flex items-center gap-2 select-none"
        >
          <span className="material-symbols-outlined text-[18px]">language</span>
          {t.langToggle}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION 1: Personal Details */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-outline-variant/20">
          <h2 className="font-headline-md text-xl font-bold text-primary mb-6 pb-2 border-b border-outline-variant/30 flex items-center gap-2">
            <span className="material-symbols-outlined">person</span>
            {t.personalHeader}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-on-surface font-semibold">{t.nom} *</label>
              <input
                type="text"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-on-surface font-semibold">{t.cognoms} *</label>
              <input
                type="text"
                required
                value={cognoms}
                onChange={(e) => setCognoms(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-on-surface font-semibold">{t.dni} *</label>
              <input
                type="text"
                required
                value={dni}
                onChange={(e) => {
                  setDni(e.target.value);
                  if (dniError) setDniError("");
                }}
                className={`w-full px-4 py-2.5 rounded-xl bg-surface-container-low border outline-none focus:ring-2 focus:ring-primary transition-all ${
                  dniError ? "border-error" : "border-outline-variant/40"
                }`}
              />
              {dniError && <span className="text-error font-label-sm text-xs mt-1">{dniError}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-on-surface font-semibold">{t.dataNaixement} *</label>
              <input
                type="date"
                required
                value={dataNaixement}
                onChange={(e) => setDataNaixement(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="flex flex-col gap-1.5 md:col-span-6">
              <label className="font-label-md text-on-surface font-semibold">{t.adreça} *</label>
              <input
                type="text"
                required
                value={adreça}
                onChange={(e) => setAdreça(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="font-label-md text-on-surface font-semibold">{t.num} *</label>
              <input
                type="text"
                required
                value={num}
                onChange={(e) => setNum(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-1.5 col-span-2">
              <label className="font-label-md text-on-surface font-semibold">{t.escala}</label>
              <input
                type="text"
                value={escala}
                onChange={(e) => setEscala(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-1 col-span-2">
              <label className="font-label-md text-on-surface font-semibold">{t.pis}</label>
              <input
                type="text"
                value={pis}
                onChange={(e) => setPis(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-1.5 col-span-2">
              <label className="font-label-md text-on-surface font-semibold">{t.porta}</label>
              <input
                type="text"
                value={porta}
                onChange={(e) => setPorta(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-on-surface font-semibold">{t.cp} *</label>
              <input
                type="text"
                required
                value={cp}
                onChange={(e) => setCp(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-on-surface font-semibold">{t.poblacio} *</label>
              <input
                type="text"
                required
                value={poblacio}
                onChange={(e) => setPoblacio(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-on-surface font-semibold">{t.telefon}</label>
              <input
                type="tel"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-on-surface font-semibold">{t.mobil} *</label>
              <input
                type="tel"
                required
                value={mobil}
                onChange={(e) => setMobil(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-on-surface font-semibold">{t.professio}</label>
              <input
                type="text"
                value={professio}
                onChange={(e) => setProfessio(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-1.5">
            <label className="font-label-md text-on-surface font-semibold">{t.email} *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* SECTION 2: Domiciliation SEPA */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-outline-variant/20">
          <h2 className="font-headline-md text-xl font-bold text-primary mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined">payments</span>
            {t.sepaHeader}
          </h2>
          <p className="text-on-surface-variant font-body-sm text-sm mb-6">
            {t.sepaSubtitle}
          </p>

          <div className="flex items-center gap-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 mb-6">
            <input
              id="sameAsMemberCheckbox"
              type="checkbox"
              checked={sameAsMember}
              onChange={(e) => setSameAsMember(e.target.checked)}
              className="w-4 h-4 text-primary bg-white border-outline-variant rounded focus:ring-primary cursor-pointer"
            />
            <label
              htmlFor="sameAsMemberCheckbox"
              className="font-body-md text-on-surface font-semibold cursor-pointer select-none"
            >
              {t.sameAsMemberLabel}
            </label>
          </div>

          {!sameAsMember && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 animate-fade-in-up">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-on-surface font-semibold">{t.sepaTitular} *</label>
                <input
                  type="text"
                  required
                  value={sepaTitular}
                  onChange={(e) => setSepaTitular(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="font-label-md text-on-surface font-semibold">{t.sepaAdreça} *</label>
                  <input
                    type="text"
                    required
                    value={sepaAdreça}
                    onChange={(e) => setSepaAdreça(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-on-surface font-semibold">{t.sepaCp} *</label>
                  <input
                    type="text"
                    required
                    value={sepaCp}
                    onChange={(e) => setSepaCp(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-on-surface font-semibold">{t.sepaDni} *</label>
                <input
                  type="text"
                  required
                  value={sepaDni}
                  onChange={(e) => {
                    setSepaDni(e.target.value);
                    if (sepaDniError) setSepaDniError("");
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl bg-surface-container-low border outline-none focus:ring-2 focus:ring-primary transition-all ${
                    sepaDniError ? "border-error" : "border-outline-variant/40"
                  }`}
                />
                {sepaDniError && <span className="text-error font-label-sm text-xs mt-1">{sepaDniError}</span>}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-on-surface font-semibold">{t.sepaEntitat} *</label>
              <input
                type="text"
                required
                placeholder="Ex. Caixabank, BBVA, Santander, etc."
                value={sepaEntitat}
                onChange={(e) => setSepaEntitat(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-on-surface font-semibold">{t.sepaIban} *</label>
              <input
                type="text"
                required
                placeholder={t.ibanPlaceholder}
                value={sepaIban}
                onChange={handleIbanChange}
                className={`w-full px-4 py-2.5 rounded-xl bg-surface-container-low border outline-none focus:ring-2 focus:ring-primary font-mono transition-all ${
                  ibanError ? "border-error" : "border-outline-variant/40"
                }`}
              />
              {ibanError && <span className="text-error font-label-sm text-xs mt-1">{ibanError}</span>}
            </div>
          </div>

          <div className="mt-6 bg-surface-container-low border border-outline-variant/20 rounded-2xl p-5 text-on-surface-variant font-body-sm leading-relaxed text-xs">
            <span className="font-semibold text-primary block mb-2">MANDAT SEPA (CORE):</span>
            {t.sepaText}
          </div>
        </div>

        {/* SECTION 3: Signature & Consent */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-outline-variant/20">
          <h2 className="font-headline-md text-xl font-bold text-primary mb-6 pb-2 border-b border-outline-variant/30 flex items-center gap-2">
            <span className="material-symbols-outlined">draw</span>
            {t.signatureHeader}
          </h2>

          <div className="flex flex-col items-center gap-4">
            <span className="font-label-md text-on-surface font-semibold self-start">
              {t.signaturePlaceholder} *
            </span>

            <div className="w-full border-2 border-dashed border-outline-variant/60 rounded-2xl p-2 bg-surface-container-low relative">
              <canvas
                ref={canvasRef}
                width={650}
                height={200}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full bg-white rounded-xl cursor-crosshair touch-none"
                style={{ height: "200px" }}
              />
              {signatureError && (
                <div className="absolute inset-0 bg-red-50/20 backdrop-blur-[1px] flex items-center justify-center rounded-xl border border-red-500/20 pointer-events-none">
                  <span className="bg-error text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md">
                    {signatureError}
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={clearCanvas}
              className="text-primary hover:text-primary-container font-label-md font-bold px-4 py-2 border border-primary/20 rounded-xl transition-all self-end flex items-center gap-1.5 active:scale-95 text-sm"
            >
              <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
              {t.clearBtn}
            </button>
          </div>

          <div className="mt-8 flex gap-3 items-start bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
            <input
              id="consentLopd"
              type="checkbox"
              required
              checked={consentLopd}
              onChange={(e) => setConsentLopd(e.target.checked)}
              className="mt-1 w-4 h-4 text-primary bg-white border-outline-variant rounded focus:ring-primary cursor-pointer"
            />
            <label
              htmlFor="consentLopd"
              className="font-body-sm text-on-surface-variant leading-relaxed select-none cursor-pointer text-xs"
            >
              {t.lopdCheck}
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-container text-white font-label-md font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md mt-8 disabled:opacity-70 disabled:cursor-not-allowed text-base"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>{t.submittingBtn}</span>
              </>
            ) : (
              <>
                <span>{t.submitBtn}</span>
                <span className="material-symbols-outlined">send</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
