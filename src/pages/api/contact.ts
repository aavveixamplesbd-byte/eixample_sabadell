import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY || '');

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message, lang } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Falten camps obligatoris' }), { status: 400 });
    }

    const langCode = lang === 'es' ? 'es' : 'ca';

    const subjectUser = langCode === 'es'
      ? 'Hemos recibido tu mensaje - AV Eixample Sabadell'
      : 'Hem rebut el teu missatge - AV Eixample Sabadell';

    const bodyUser = langCode === 'es'
      ? `Hola ${name},\n\nGracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje correctamente y te responderemos lo antes posible.\n\nMensaje enviado:\n"${message}"\n\nUn saludo,\nAsociación de Vecinos Eixample Sabadell`
      : `Hola ${name},\n\nGràcies per posar-te en contacte amb nosaltres. Hem rebut el teu missatge correctament i et respondrem el més aviat possible.\n\nMissatge enviat:\n"${message}"\n\nAtentament,\nAssociació de Veïns Eixample Sabadell`;

    const subjectAdmin = `Nou missatge de contacte: ${name}`;
    const bodyAdmin = `S'ha rebut un nou missatge des del formulari de contacte web:\n\n- Nom: ${name}\n- Correu: ${email}\n- Missatge:\n${message}\n- Idioma: ${langCode}`;

    // Enviar correo al usuario
    await resend.emails.send({
      from: 'Associació de Veïns <hola@aveixamplesbd.com>',
      to: email,
      subject: subjectUser,
      text: bodyUser
    });

    // Enviar correo al administrador
    await resend.emails.send({
      from: 'Web AVES <hola@aveixamplesbd.com>',
      to: 'secretaria@aveixamplesbd.com',
      subject: subjectAdmin,
      text: bodyAdmin
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/contact:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
