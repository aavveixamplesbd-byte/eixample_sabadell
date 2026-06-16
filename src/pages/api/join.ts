import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY || '');

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, dni, email, phone, iban, lang } = await request.json();

    if (!name || !dni || !email || !phone || !iban) {
      return new Response(JSON.stringify({ error: 'Falten camps obligatoris' }), { status: 400 });
    }

    const langCode = lang === 'es' ? 'es' : 'ca';

    // Contenido del correo del usuario
    const subjectUser = langCode === 'es' 
      ? 'Mandato SEPA - Confirmación de solicitud' 
      : 'Mandat SEPA - Confirmació de sol·licitud';

    const bodyUser = langCode === 'es'
      ? `Hola ${name},\n\nGracias por unirte a la Asociación de Vecinos Eixample Sabadell.\n\nPara completar tu alta de socio con cuota anual de 12€, necesitamos que confirmes y firmes digitalmente tu documento de Mandato SEPA.\n\nAquí tienes los datos facilitados:\n- Titular: ${name}\n- DNI/NIE: ${dni}\n- Teléfono: ${phone}\n- IBAN: ${iban}\n\nEn breve nos pondremos en contacto contigo para proceder con la firma del mandato.\n\nAtentamente,\nAsociación de Vecinos Eixample Sabadell`
      : `Hola ${name},\n\nGràcies per unir-te a l'Associació de Veïns Eixample Sabadell.\n\nPer completar la teva alta de soci amb quota anual de 12€, necessitem que confirmis i firmis digitalment el teu document de Mandat SEPA.\n\nAquí tens les dades facilitades:\n- Titular: ${name}\n- DNI/NIE: ${dni}\n- Telèfon: ${phone}\n- IBAN: ${iban}\n\nEn breu ens posarem en contacte amb tu per procedir amb la signatura del mandat.\n\nAtentament,\nAssociació de Veïns Eixample Sabadell`;

    const subjectAdmin = `Nova sol·licitud d'alta de soci: ${name}`;
    const bodyAdmin = `S'ha rebut una nova sol·licitud d'alta de soci a la web:\n\n- Nom: ${name}\n- Correu: ${email}\n- Telèfon: ${phone}\n- DNI: ${dni}\n- IBAN: ${iban}\n- Idioma: ${langCode}`;

    // Enviar correo al usuario
    await resend.emails.send({
      from: 'Associació de Veïns <socis@send.aveixamplesbd.com>',
      to: email,
      subject: subjectUser,
      text: bodyUser
    });

    // Enviar correo al administrador
    await resend.emails.send({
      from: 'Web AVES <info@send.aveixamplesbd.com>',
      to: 'hola@aveixamplesbd.com',
      subject: subjectAdmin,
      text: bodyAdmin
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/join:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
